"use client";

import { useState } from "react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  async function handleDownload() {
    if (!password) return;
    setLoading(true);
    setError("");

    const res = await fetch(`/api/leads/download?pw=${encodeURIComponent(password)}`);

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error === "No leads file yet" ? "No leads have been submitted yet." : "Incorrect password.");
      setLoading(false);
      return;
    }

    // Trigger browser download
    const blob = await res.blob();
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `tivor-leads-${new Date().toISOString().slice(0, 10)}.xlsx`;
    a.click();
    URL.revokeObjectURL(url);
    setLoading(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f2ebe2] px-4">
      <div className="w-full max-w-sm rounded-sm bg-white p-8 shadow-sm">
        <h1
          className="mb-6 text-[26px] leading-tight text-[#151515]"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          Download Leads
        </h1>

        <div className="flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleDownload()}
            placeholder="Enter admin password"
            className="form-input"
            style={{ fontFamily: "var(--font-secondary)" }}
          />

          {error && (
            <p className="text-sm text-red-600" style={{ fontFamily: "var(--font-secondary)" }}>
              {error}
            </p>
          )}

          <button
            onClick={handleDownload}
            disabled={!password || loading}
            className="h-11 rounded-sm bg-[#151515] px-6 text-[16px] text-white disabled:opacity-40"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            {loading ? "Preparing…" : "Download Excel"}
          </button>
        </div>

        <p
          className="mt-5 text-xs text-[#999]"
          style={{ fontFamily: "var(--font-secondary)" }}
        >
          Downloads all leads — Contact Us, Plan Your Journey, and Package Enquiries — as separate tabs in one Excel file.
        </p>
      </div>
    </main>
  );
}
