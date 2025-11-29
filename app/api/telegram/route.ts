import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface TelegramPhoto {
  file_id: string;
  file_unique_id?: string;
  width?: number;
  height?: number;
  file_size?: number;
}

interface TelegramFrom {
  id?: number;
  is_bot?: boolean;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

interface TelegramMessage {
  message_id?: number;
  from?: TelegramFrom;
  date?: number;
  chat?: { id?: number; type?: string; title?: string };
  text?: string;
  caption?: string;
  photo?: TelegramPhoto[];
}

type TelegramUpdate = {
  message?: TelegramMessage;
  edited_message?: TelegramMessage;
  channel_post?: TelegramMessage;
};

const DATA_FILE = path.join(process.cwd(), "data", "submitted_products.json");
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

async function ensureDir(dir: string) {
  try {
    await fs.promises.access(dir);
  } catch {
    await fs.promises.mkdir(dir, { recursive: true });
  }
}

type SubmittedProduct = {
  id?: number;
  createdAt?: string;
  nombre: string;
  descripcion: string;
  precio?: string;
  precioAntes?: string | undefined;
  etiqueta?: string | null;
  stock?: number;
  activo?: boolean;
  imagenes: string[];
};

async function saveProduct(product: SubmittedProduct) {
  try {
    let current: SubmittedProduct[] = [];
    try {
        const raw = await fs.promises.readFile(DATA_FILE, "utf-8");
        current = JSON.parse(raw || "[]") as SubmittedProduct[];
      } catch {
        current = [];
      }
    product.id = Date.now();
    product.createdAt = new Date().toISOString();
    current.unshift(product);
    await fs.promises.writeFile(DATA_FILE, JSON.stringify(current, null, 2), "utf-8");
    return product;
  } catch (err) {
    throw err;
  }
}

async function downloadTelegramFile(botToken: string, fileId: string): Promise<string> {
  // 1) getFile
  const infoRes = await fetch(
    `https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`
  );
  const infoJson = await infoRes.json();
  if (!infoJson.ok) throw new Error("getFile failed");
  const filePath = infoJson.result.file_path as string;
  const fileUrl = `https://api.telegram.org/file/bot${botToken}/${filePath}`;

  await ensureDir(UPLOAD_DIR);
  const filename = path.basename(filePath);
  const dest = path.join(UPLOAD_DIR, `${Date.now()}-${filename}`);

  const fileRes = await fetch(fileUrl);
  if (!fileRes.ok) throw new Error("download failed");
  const buffer = Buffer.from(await fileRes.arrayBuffer());
  await fs.promises.writeFile(dest, buffer);
  // return public path
  return `/uploads/${path.basename(dest)}`;
}

export async function POST(request: Request) {
  try {
    const update: TelegramUpdate = await request.json();
    // handle message updates
    const botToken = process.env.TELEGRAM_BOT_TOKEN;

    const message = update.message ?? update.edited_message ?? update.channel_post;
    if (!message) return NextResponse.json({ ok: true, reason: "no message" });

    // Expecting either: /newproduct {json} or photo with caption containing json
    let productData: Partial<SubmittedProduct> | null = null;
    if (message.text && message.text.trim().startsWith("/newproduct")) {
      const after = message.text.trim().replace(/^\/newproduct\s*/i, "");
      try {
        productData = JSON.parse(after) as Partial<SubmittedProduct>;
      } catch {
        // not JSON -> store as simple note
        productData = { nombre: after || "Nuevo producto", descripcion: "Enviado desde Telegram" };
      }
    } else if (message.caption) {
      // try parse caption as json
      try {
        productData = JSON.parse(message.caption) as Partial<SubmittedProduct>;
      } catch {
        // leave null
      }
    }

    // build product
    const product: SubmittedProduct = {
      nombre: productData?.nombre ?? message.from?.first_name ?? "Producto desde Telegram",
      descripcion: productData?.descripcion ?? message.caption ?? (typeof productData === "string" ? productData : ""),
      precio: productData?.precio ?? "$0",
      etiqueta: productData?.etiqueta ?? null,
      stock: productData?.stock ?? 1,
      activo: true,
      imagenes: [],
    };

    // handle photo download if available
    if (message.photo && Array.isArray(message.photo) && message.photo.length > 0) {
      const largest = message.photo[message.photo.length - 1];
      const fileId = largest.file_id as string;
      if (botToken) {
        try {
          const publicUrl = await downloadTelegramFile(botToken, fileId);
          product.imagenes.push(publicUrl);
        } catch {
          // fallback to file_id
          product.imagenes.push(`telegram://file_id/${fileId}`);
        }
      } else {
        product.imagenes.push(`telegram://file_id/${fileId}`);
      }
    }

    const saved = await saveProduct(product);
    return NextResponse.json({ ok: true, saved });
  } catch (err) {
    console.error("telegram webhook error", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
