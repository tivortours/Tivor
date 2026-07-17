"use client";

import { useState } from "react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  async function handleOpen() {
    if (!password) return;
    setLoading(true);
    setError("");

    const res = await fetch(`/api/leads/download?pw=${encodeURIComponent(password)}`);

    if (!res.ok) {
      setError("Incorrect password.");
      setLoading(false);
      return;
    }

    const body = await res.json().catch(() => ({}));
    if (!body.url) {
      setError("Leads sheet is not configured yet.");
      setLoading(false);
      return;
    }

    window.open(body.url, "_blank", "noopener,noreferrer");
    setLoading(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f2ebe2] px-4">
      <div className="w-full max-w-sm rounded-sm bg-white p-8 shadow-sm">
        <h1
          className="mb-6 text-[26px] leading-tight text-[#151515]"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          Open Leads Sheet
        </h1>

        <div className="flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleOpen()}
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
            onClick={handleOpen}
            disabled={!password || loading}
            className="h-11 cursor-pointer rounded-sm bg-[#151515] px-6 text-[16px] text-white disabled:cursor-not-allowed disabled:opacity-40"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            {loading ? "Opening…" : "Open Leads Sheet"}
          </button>
        </div>

        <p
          className="mt-5 text-xs text-[#999]"
          style={{ fontFamily: "var(--font-secondary)" }}
        >
          Opens the live Google Sheet — Contact Us, Plan Your Journey, Package Enquiry, and Newsletter each have their own tab.
        </p>
      </div>
    </main>
  );
}
