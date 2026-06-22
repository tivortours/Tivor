"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Testimonial } from "../app/site-data";

function TestimonialModal({ testimonial, onClose }: { testimonial: Testimonial; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => { document.removeEventListener("keydown", handler); };
  }, [onClose]);

  const root = typeof document !== "undefined" ? document.getElementById("modal-root") : null;
  if (!root) return null;

  return createPortal(
    <>
    {/* backdrop */}
    <div
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 9998, backgroundColor: "rgba(0,0,0,0.55)" }}
      onClick={onClose}
    />
    {/* card */}
    <div
      style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 9999, width: "calc(100% - 2rem)", maxWidth: "766px", maxHeight: "88vh", overflowY: "auto", overscrollBehavior: "contain", borderRadius: "2px", backgroundColor: "#faf7f4", padding: "2.5rem" }}
      onClick={(e) => e.stopPropagation()}
    >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{ position: "absolute", top: "1.25rem", right: "1.25rem", display: "flex", alignItems: "center", justifyContent: "center", width: "2rem", height: "2rem", color: "#151515" }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <Image src="/Vector.svg" alt="5 stars" width={92} height={16} className="object-contain object-left" />

          <p className="text-[16px] lg:text-[22px]" style={{ fontFamily: "var(--font-secondary)", fontWeight: 600, lineHeight: 1.3, color: "#151515" }}>
            {testimonial.quote}
          </p>

          <div style={{ fontFamily: "var(--font-secondary)", fontSize: "15px", lineHeight: 1.7, color: "#3d3d3d" }}>
            {testimonial.body.split(/\n+/).map((para, i) => (
              <p key={i} style={i > 0 ? { marginTop: "1rem" } : {}}>{para}</p>
            ))}
          </div>

          <div style={{ fontFamily: "var(--font-secondary)" }}>
            <p style={{ fontSize: "14px", fontWeight: 500, color: "#151515" }}>— {testimonial.author}</p>
            {testimonial.location && (
              <p style={{ fontSize: "14px", color: "#777", paddingLeft: "1rem" }}>{testimonial.location}</p>
            )}
          </div>
        </div>
      </div>
    </>,
    root
  );
}

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [active, setActive] = useState<Testimonial | null>(null);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 2);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    sync();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", sync, { passive: true });
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", sync);
      ro.disconnect();
    };
  }, [sync]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const amount = card ? card.offsetWidth : el.clientWidth;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <>
      <div className="relative">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((testimonial, index) => {
            const PREVIEW_LIMIT = 160;
            const firstPara = testimonial.body.split(/\n+/)[0];
            const preview = firstPara.length > PREVIEW_LIMIT
              ? firstPara.slice(0, PREVIEW_LIMIT).trimEnd() + "…"
              : firstPara;
            const hasMore = testimonial.body.length > PREVIEW_LIMIT || testimonial.body.trim() !== firstPara.trim();

            return (
              <article
                key={testimonial.author}
                className={`flex w-full shrink-0 snap-start flex-col gap-6 py-2 sm:w-1/2 sm:px-6 sm:py-6 xl:w-1/3 xl:px-7 xl:py-7 ${
                  index < testimonials.length - 1 ? "sm:border-r sm:border-brown-300" : ""
                }`}
              >
                <Image
                  src="/Vector.svg"
                  alt="5 stars"
                  width={92}
                  height={16}
                  className="object-contain object-left"
                />
                <p
                  className="text-[18px] font-medium leading-snug text-dark-500 lg:text-[22px] lg:font-semibold"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  {testimonial.quote}
                </p>
                <p
                  className="flex-1 text-[13px] leading-relaxed text-dark-400 lg:text-base"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  {preview}
                  {hasMore && (
                    <button
                      onClick={() => setActive(testimonial)}
                      className="ml-1 font-semibold text-dark-500 cursor-pointer"
                      style={{ fontFamily: "var(--font-secondary)" }}
                    >
                      Read More
                    </button>
                  )}
                </p>
                <div style={{ fontFamily: "var(--font-secondary)" }}>
                  <p className="text-sm font-medium text-dark-500">— {testimonial.author}</p>
                  {testimonial.location && (
                    <p className="pl-4 text-sm text-dark-400">{testimonial.location}</p>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <button
          onClick={() => scrollByCard(-1)}
          aria-label="Previous testimonial"
          className={`absolute left-0 top-1/2 z-10 -translate-x-5 -translate-y-1/2 transition-opacity duration-300 sm:-translate-x-7 lg:-translate-x-10 xl:-translate-x-12 ${
            !canPrev ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M17 21L10 14L17 7" stroke="#151515" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          onClick={() => scrollByCard(1)}
          aria-label="Next testimonial"
          className={`absolute right-0 top-1/2 z-10 translate-x-5 -translate-y-1/2 transition-opacity duration-300 sm:translate-x-7 lg:translate-x-10 xl:translate-x-12 ${
            !canNext ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M11 7L18 14L11 21" stroke="#151515" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {active && <TestimonialModal testimonial={active} onClose={() => setActive(null)} />}
    </>
  );
}
