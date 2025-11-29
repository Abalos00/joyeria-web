"use client";

import { useState, useRef } from "react";

type BuilderProduct = {
  nombre: string;
  descripcion?: string;
  precio?: string;
  precioAntes?: string;
  etiqueta?: string;
  stock?: number;
  imagenes?: string[]; // base64 previews only on client
};

export default function TelegramProductBuilder({ hideJson }: { hideJson?: boolean } = {}) {
  const [product, setProduct] = useState<BuilderProduct>({
    nombre: "",
    descripcion: "",
    precio: "",
    precioAntes: "",
    etiqueta: "",
    stock: 1,
    imagenes: [],
  });
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  function handleFiles(files: FileList | null) {
    if (!files) return;
    const arr = Array.from(files).slice(0, 6);
    arr.forEach((f) => {
      const r = new FileReader();
      r.onload = () => {
        setProduct((p) => ({ ...p, imagenes: [...(p.imagenes || []), String(r.result)] }));
      };
      r.readAsDataURL(f);
    });
  }

  function buildJson() {
    const out: any = {
      nombre: product.nombre,
      descripcion: product.descripcion,
      precio: product.precio || "$0",
      precioAntes: product.precioAntes || undefined,
      etiqueta: product.etiqueta || undefined,
      stock: product.stock ?? 1,
      imagenes: product.imagenes ?? [],
    };
    return JSON.stringify(out);
  }

  function copyJson() {
    const json = buildJson();
    navigator.clipboard?.writeText(json).then(() => setMessage("JSON copiado al portapapeles"));
  }

  function openWhatsApp() {
    // Create a short text summary for WhatsApp
    const lines = [] as string[];
    lines.push(`Producto: ${product.nombre}`);
    if (product.descripcion) lines.push(product.descripcion);
    if (product.precio) lines.push(`Precio: ${product.precio}`);
    lines.push("(Imágenes adjuntas por separado)");
    const text = encodeURIComponent(lines.join("\n"));
    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "56930273601";
    const url = `https://wa.me/${number}?text=${text}`;
    window.open(url, "_blank");
  }

  async function sendToWebhook() {
    setSending(true);
    setMessage(null);
    try {
      // send as Telegram-style update with /newproduct {json}
      const json = buildJson();
      const payload = { message: { text: `/newproduct ${json}`, from: { first_name: "WebUser" } } };
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Error al enviar");
          setMessage("Producto guardado correctamente.");
      // optionally clear
    } catch (err: any) {
          setMessage(`Error: ${err?.message ?? String(err)}`);
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="mt-4 bg-slate-50/80 border border-slate-100 rounded-2xl p-4">
      <h4 className="text-sm font-semibold mb-2">Generador visual (Telegram)</h4>

      <div className="grid gap-2">
        <label className="text-xs text-slate-600">Nombre</label>
        <input value={product.nombre} onChange={(e) => setProduct({ ...product, nombre: e.target.value })} className="w-full rounded border px-3 py-2 text-sm" />

        <label className="text-xs text-slate-600">Descripción</label>
        <textarea value={product.descripcion} onChange={(e) => setProduct({ ...product, descripcion: e.target.value })} className="w-full rounded border px-3 py-2 text-sm" rows={3} />

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-slate-600">Precio</label>
            <input value={product.precio} onChange={(e) => setProduct({ ...product, precio: e.target.value })} className="w-full rounded border px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-xs text-slate-600">Stock</label>
            <input type="number" value={product.stock} onChange={(e) => setProduct({ ...product, stock: Number(e.target.value) })} className="w-full rounded border px-3 py-2 text-sm" />
          </div>
        </div>

        <label className="text-xs text-slate-600">Etiqueta (opcional)</label>
        <input value={product.etiqueta} onChange={(e) => setProduct({ ...product, etiqueta: e.target.value })} className="w-full rounded border px-3 py-2 text-sm" />

        <div>
          <div className="text-xs text-slate-600 mb-1">Imágenes (previsualización)</div>
          <input ref={fileRef} type="file" accept="image/*" multiple onChange={(e) => handleFiles(e.target.files)} className="text-sm" />
          <div className="mt-2 grid grid-cols-3 gap-2">
            {product.imagenes?.map((src, i) => (
              <div key={i} className="h-20 bg-white overflow-hidden rounded border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`img-${i}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 mt-3">
          {!hideJson && (
            <button type="button" onClick={copyJson} className="px-3 py-2 rounded bg-white border text-sm">Copiar JSON</button>
          )}
          <button type="button" onClick={openWhatsApp} className="px-3 py-2 rounded bg-emerald-600 text-white text-sm">Abrir WhatsApp</button>
          <button type="button" onClick={sendToWebhook} disabled={sending} className="px-3 py-2 rounded border text-sm bg-white">
            {sending ? "Guardando..." : hideJson ? "Guardar producto" : "Enviar al webhook"}
          </button>
        </div>

        {message && <p className="text-xs text-slate-600 mt-2">{message}</p>}
      </div>
    </section>
  );
}
