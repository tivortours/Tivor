"use client";

import { useCallback, useEffect, useState } from "react";
import { Portal } from "./Portal";

// ── Modal ─────────────────────────────────────────────────────────────────────
function Modal({ journeyTitle, inclusions, onClose }: {
  journeyTitle: string;
  inclusions: string[];
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  function handleClose() {
    if (exiting) return;
    setExiting(true);
    setVisible(false);
    setTimeout(onClose, 280);
  }

  return (
    <Portal>
    <div
      className="fixed inset-0 z-[200] flex flex-col"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 280ms ease" }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={handleClose} />

      {/* Centering wrapper */}
      <div className="relative flex min-h-full items-end justify-center sm:items-center sm:p-6">
        {/* Panel */}
        <div
          className="relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[4px] border border-[#ddd0c5] bg-[#f7f4f1] sm:max-h-[88dvh] sm:max-w-[760px] sm:rounded-[2px]"
          style={{
            transition: "transform 280ms cubic-bezier(0.4,0,0.2,1)",
            transform: visible ? "translateY(0)" : "translateY(40px)",
          }}
        >
          {/* Header */}
          <div className="shrink-0 px-6 pt-7 sm:px-14 sm:pt-12">
            <div className="flex items-center justify-between gap-4">
              <h2
                className="text-[22px] leading-tight text-[#151515] sm:text-[28px]"
                style={{ fontFamily: "var(--font-primary)", fontWeight: 600 }}
              >
                Inclusions
              </h2>
              <button
                onClick={handleClose}
                className="shrink-0 rounded-full p-1.5 transition-colors hover:bg-[#ddd0c5]"
                aria-label="Close"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M14 4L4 14M4 4L14 14" stroke="#151515" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="mt-5 h-px w-full bg-[#ddd0c5]" />
          </div>

          {/* Scrollable body */}
          <div
            className="overflow-y-auto overscroll-contain px-6 py-7 sm:px-14 sm:py-10"
            style={{ scrollbarWidth: "none" }}
          >
            {inclusions.length === 0 ? (
              <p
                className="text-[16px] text-[#777]"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                No inclusions listed for this journey.
              </p>
            ) : (
              <ul className="flex flex-col gap-6">
                {inclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    {/* Bullet dot */}
                    <span className="mt-[6px] shrink-0">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <circle cx="5" cy="5" r="5" fill="#3d3d3d" />
                      </svg>
                    </span>
                    <p
                      className="text-[18px] leading-snug text-[#3d3d3d] sm:text-[20px]"
                      style={{ fontFamily: "var(--font-secondary)" }}
                    >
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
    </Portal>
  );
}

// ── Public export ─────────────────────────────────────────────────────────────
export function InclusionsButton({
  journeyTitle,
  inclusions,
  className,
  style,
  children,
}: {
  journeyTitle: string;
  inclusions: string[];
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button className={className} style={style} onClick={() => setOpen(true)}>
        {children}
      </button>
      {open && (
        <Modal journeyTitle={journeyTitle} inclusions={inclusions} onClose={close} />
      )}
    </>
  );
}
