"use client";

import { useCallback, useEffect, useState } from "react";
import { PortableText } from "@portabletext/react";
import { getTextAlign } from "../lib/portableText";
import { Portal } from "./Portal";

// Inclusions are Portable Text: bullets get the dot marker; size comes from
// the editor's Normal/Small/Large style dropdown, independent of whether the
// line is bulleted or plain (e.g. a plain line used as a section divider
// like "Available on Request", not just a note under one bullet). Alignment
// comes from the Align Left/Center/Right marks (see lib/portableText) —
// rendered as inert pass-throughs below since text-align has no effect on
// inline marks. Plain lines default to left/black; margin keeps them from
// looking cramped between two bullet lists, which each carry their own
// internal gap-6 but no outer margin of their own.
const inclusionSize: Record<string, string> = {
  small: "text-[14px]",
  normal: "text-[18px] sm:text-[20px]",
  large: "text-[22px] sm:text-[24px]",
};

type RichValue = { style?: string; children?: any[] };

const alignMarks = {
  alignLeft: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
  alignCenter: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
  alignRight: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
};

function inclusionNoteLine({ children, value }: { children?: React.ReactNode; value: RichValue }) {
  return (
    <p
      className={`my-6 ${inclusionSize[value.style ?? "normal"] ?? inclusionSize.normal} leading-snug text-dark-500`}
      style={{ fontFamily: "var(--font-secondary)", textAlign: getTextAlign(value) ?? "left" }}
    >
      {children}
    </p>
  );
}

const inclusionsComponents = {
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="flex flex-col gap-6">{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children, value }: { children?: React.ReactNode; value: RichValue }) => (
      <li className="flex items-start gap-3">
        <span className="mt-2.25 shrink-0">
          <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
            <circle cx="3" cy="3" r="3" fill="#3d3d3d" />
          </svg>
        </span>
        <p
          className={`flex-1 ${inclusionSize[value.style ?? "normal"] ?? inclusionSize.normal} leading-snug text-[#3d3d3d]`}
          style={{ fontFamily: "var(--font-secondary)", textAlign: getTextAlign(value) }}
        >
          {children}
        </p>
      </li>
    ),
  },
  marks: alignMarks,
  block: {
    normal: inclusionNoteLine,
    small: inclusionNoteLine,
    large: inclusionNoteLine,
  },
};

// ── Modal ─────────────────────────────────────────────────────────────────────
function Modal({ journeyTitle, inclusions, onClose }: {
  journeyTitle: string;
  inclusions: any[];
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
      <div className="relative flex min-h-full items-center justify-center p-4">
        {/* Panel */}
        <div
          className="modal-panel relative flex max-h-[90vh] w-full flex-col overflow-hidden rounded-[4px] border border-[#ddd0c5] bg-[#f7f4f1] sm:max-w-[760px]"
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
              <PortableText value={inclusions} components={inclusionsComponents} />
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
  inclusions: any[];
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
