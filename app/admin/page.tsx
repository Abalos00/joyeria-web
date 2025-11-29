"use client";

import { useEffect, useState } from "react";
import TelegramProductBuilder from "../../components/TelegramProductBuilder";

export default function AdminPage() {
  const [verified, setVerified] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // check existing session
    fetch("/api/admin/verify").then(async (res) => {
      try {
        const j = await res.json();
        setVerified(Boolean(j?.valid));
      } catch {
        setVerified(false);
      }
    });
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const j = await res.json();
      if (res.ok && j?.ok) {
        setVerified(true);
      } else {
        setMessage(j?.error || "Credenciales inválidas");
      }
    } catch (err: any) {
      setMessage(String(err?.message ?? err));
    } finally {
      setLoading(false);
    }
  }

  if (verified === null) return <p className="p-6">Verificando sesión...</p>;

  if (!verified) {
    return (
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Acceso administrador</h1>
        <form onSubmit={submit} className="space-y-3 bg-white p-4 rounded shadow">
          <label className="text-sm">Contraseña</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full rounded border px-3 py-2" />
          <div className="flex items-center gap-2">
            <button disabled={loading} className="px-3 py-2 bg-emerald-600 text-white rounded">{loading ? "Entrando…" : "Entrar"}</button>
            <p className="text-sm text-slate-600">Usa la contraseña configurada en el servidor.</p>
          </div>
          {message && <p className="text-xs text-red-600">{message}</p>}
        </form>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Panel de administración</h1>
        <form action="/api/admin/logout" method="post">
          <button type="submit" className="text-sm px-3 py-2 border rounded">Cerrar sesión</button>
        </form>
      </div>

      <p className="text-sm text-slate-600 mb-4">Aquí puedes crear productos de forma guiada sin tocar JSON. Los productos se guardan en el sistema y aparecerán en el catálogo.</p>

      <section>
        <TelegramProductBuilder hideJson />
      </section>
    </main>
  );
}
