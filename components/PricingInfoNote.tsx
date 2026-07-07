"use client";

import { useLayoutEffect, useEffect, useRef, useState } from "react";

// Fixed legal copy — wording is mandated, not editor-controlled. Sanity only
// toggles whether the icon shows at all per journey (showIndicativePricingNote).
const NOTE_TEXT =
  "Prices shown are indicative. Your final price will be confirmed at the time of booking and calculated using the prevailing exchange rate in the destination's pricing currency.";

const MOBILE_POPOVER_WIDTH = 256; // matches w-64
const VIEWPORT_MARGIN = 16;

export function PricingInfoNote() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<HTMLButtonElement>(null);
  // Below `sm` the popover is centered under the price text as a whole, not
  // the icon (which sits wherever "person" ends up, not the line's true
  // center) — a fixed-width box centered or right-anchored on the icon can
  // run past the screen edge and get clipped by the page's overflow-x-clip.
  // Measuring the icon and clamping to the viewport guarantees it stays on
  // screen regardless of where the icon lands. Desktop (sm+) keeps the
  // original CSS-only centered-under-icon positioning untouched.
  const [mobilePos, setMobilePos] = useState<{ top: number; left: number } | null>(null);

  useLayoutEffect(() => {
    if (!open) {
      setMobilePos(null);
      return;
    }
    if (window.innerWidth >= 640 || !iconRef.current) return;

    const rect = iconRef.current.getBoundingClientRect();
    const left = Math.min(
      Math.max(rect.left + rect.width / 2 - MOBILE_POPOVER_WIDTH / 2, VIEWPORT_MARGIN),
      window.innerWidth - MOBILE_POPOVER_WIDTH - VIEWPORT_MARGIN
    );
    setMobilePos({ top: rect.bottom + 8, left });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <span
      ref={wrapRef}
      className="relative inline-flex items-center ml-3"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        ref={iconRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        aria-label="Indicative pricing information"
        aria-expanded={open}
        className="cursor-pointer text-dark-400 hover:text-dark-500"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.3" />
          <rect x="7.25" y="6.75" width="1.5" height="5" rx="0.75" fill="currentColor" />
          <circle cx="8" cy="4.5" r="0.9" fill="currentColor" />
        </svg>
      </button>

      {open && (
        <div
          role="tooltip"
          className="absolute top-full z-50 mt-2 w-64 rounded-[4px] bg-[#2b2420] p-4 text-left shadow-lg sm:left-1/2 sm:w-96 sm:-translate-x-1/2"
          style={mobilePos ? { position: "fixed", top: mobilePos.top, left: mobilePos.left } : undefined}
        >
          <p
            className="text-[13px] font-semibold text-white"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            Indicative Pricing
          </p>
          <p
            className="mt-1.5 text-[12.5px] leading-relaxed text-[#e4dcd3]"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            {NOTE_TEXT}
          </p>
        </div>
      )}
    </span>
  );
}
