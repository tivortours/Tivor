"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DIAL_COUNTRIES } from "../lib/countries";
import { Portal } from "./Portal";
import { useFloatingRect } from "./useFloatingRect";

export function PhoneCountrySelect({
  value,
  onChange,
  hasError,
}: {
  value: string;
  onChange: (code: string) => void;
  hasError?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const rect = useFloatingRect(open, triggerRef);

  const current = DIAL_COUNTRIES.find((c) => c.code === value) ?? DIAL_COUNTRIES[0];

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DIAL_COUNTRIES;
    return DIAL_COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dial.includes(q) ||
        c.code.toLowerCase() === q
    );
  }, [query]);

  function select(code: string) {
    onChange(code);
    setOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[activeIndex]) select(filtered[activeIndex].code);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div className="relative shrink-0">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-full cursor-pointer items-center px-3"
      >
        <span className="mr-1 text-xl leading-none" aria-hidden>{current.flag}</span>
        <svg className="mr-1.5 shrink-0" width="9" height="6" viewBox="0 0 9 6" fill="none">
          <path d="M1 1L4.5 5L8 1" stroke="#555" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <span className="text-[13px] font-medium text-dark-500" style={{ fontFamily: "var(--font-secondary)" }}>
          {current.dial}
        </span>
      </button>

      {open && rect && (
        <Portal>
          <div
            ref={panelRef}
            className="fixed z-300 w-72 overflow-hidden rounded-xs border border-[#ddd0c5] bg-white shadow-lg"
            style={{ top: rect.top, left: rect.left }}
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search country or code…"
              className="w-full border-b border-[#ddd0c5] px-4 py-2.5 text-sm text-dark-500 outline-none placeholder-[#999]"
              style={{ fontFamily: "var(--font-secondary)" }}
            />
            <div className="max-h-60 overflow-y-auto">
              {filtered.length === 0 && (
                <p className="px-4 py-3 text-sm text-[#999]" style={{ fontFamily: "var(--font-secondary)" }}>
                  No matches
                </p>
              )}
              {filtered.map((c, i) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => select(c.code)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left text-sm text-dark-500 ${
                    i === activeIndex ? "bg-[#f7f4f1]" : ""
                  } ${c.code === value ? "font-medium" : ""}`}
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  <span aria-hidden>{c.flag}</span>
                  <span className="flex-1 truncate">{c.name}</span>
                  <span className="text-[#777]">{c.dial}</span>
                </button>
              ))}
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}
