"use client";

import { useState } from "react";
import { newsletterSchema } from "../lib/validation";

export function NewsletterForm({
  placeholder,
  buttonLabel,
}: {
  placeholder: string;
  buttonLabel: string;
}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  async function handleSubmit() {
    const result = newsletterSchema.safeParse({ email });
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Please enter a valid email address");
      return;
    }
    setError("");
    setStatus("submitting");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "newsletter", email: result.data.email }),
      });
      if (!res.ok) throw new Error("Request failed");
      setEmail("");
      setStatus("done");
    } catch {
      setStatus("idle");
      setError("Something went wrong. Please try again.");
    }
  }

  if (status === "done") {
    return (
      <p
        className="flex h-11.25 w-full max-w-[430px] items-center justify-center rounded-xs bg-[#f1f1f1] px-5 text-sm text-grey-300"
        style={{ fontFamily: "var(--font-secondary)" }}
      >
        Thanks for subscribing!
      </p>
    );
  }

  return (
    <div className="flex w-full max-w-[430px] flex-col gap-1">
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-0">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder={placeholder}
          className={`h-11.25 w-full shrink-0 rounded-xs bg-[#f1f1f1] px-5 text-sm text-grey-300 outline-none ring-1 sm:w-auto sm:flex-1 sm:rounded-r-none ${
            error ? "ring-red-400" : "ring-transparent"
          }`}
          style={{ fontFamily: "var(--font-secondary)" }}
        />
        <button
          onClick={handleSubmit}
          disabled={status === "submitting"}
          className="h-11.25 cursor-pointer shrink-0 rounded-xs bg-grey-500 px-6 text-base text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60 sm:rounded-l-none sm:text-lg"
          style={{ fontFamily: "var(--font-secondary)" }}
        >
          {status === "submitting" ? "Subscribing…" : buttonLabel}
        </button>
      </div>
      <p
        className="text-[12px] text-red-400"
        style={{ fontFamily: "var(--font-secondary)", visibility: error ? "visible" : "hidden" }}
      >
        {error || "placeholder"}
      </p>
    </div>
  );
}
