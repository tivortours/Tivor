"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Portal } from "./Portal";
import { useFloatingRect } from "./useFloatingRect";

export function CountrySelect({
  value,
  onChange,
  placeholder,
  options,
  hasError,
  className = "form-select",
}: {
  value: string;
  onChange: (name: string) => void;
  placeholder: string;
  options: string[];
  hasError?: boolean;
  // Defaults to the large-form `.form-select` look (Contact/Plan pages).
  // Callers embedding this in a differently-sized form (e.g. the compact
  // BookingModal) pass their own trigger classes to match.
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const rect = useFloatingRect(open, triggerRef);

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
    if (!q) return options;
    return options.filter((o) => o.toLowerCase().includes(q));
  }, [query, options]);

  function select(name: string) {
    onChange(name);
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
      if (filtered[activeIndex]) select(filtered[activeIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`${className} flex cursor-pointer items-center justify-between text-left ring-1 ${
          hasError ? "ring-red-400" : "ring-transparent"
        }`}
        style={{ fontFamily: "var(--font-secondary)", color: value ? "#151515" : "#999" }}
      >
        <span className="truncate">{value || placeholder}</span>
        <svg className="ml-2 shrink-0" width="12" height="7" viewBox="0 0 12 7" fill="none">
          <path d="M1 1L6 6L11 1" stroke="#555" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </button>

      {open && rect && (
        <Portal>
          <div
            ref={panelRef}
            className="fixed z-300 overflow-hidden rounded-xs border border-[#ddd0c5] bg-white shadow-lg"
            style={{ top: rect.top, left: rect.left, width: rect.width }}
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search country…"
              className="w-full border-b border-[#ddd0c5] px-4 py-2.5 text-sm text-dark-500 outline-none placeholder-[#999]"
              style={{ fontFamily: "var(--font-secondary)" }}
            />
            <div className="max-h-60 overflow-y-auto">
              {filtered.length === 0 && (
                <p className="px-4 py-3 text-sm text-[#999]" style={{ fontFamily: "var(--font-secondary)" }}>
                  No matches
                </p>
              )}
              {filtered.map((o, i) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => select(o)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`block w-full cursor-pointer px-4 py-2 text-left text-sm text-dark-500 ${
                    i === activeIndex ? "bg-[#f7f4f1]" : ""
                  } ${o === value ? "font-medium" : ""}`}
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}
