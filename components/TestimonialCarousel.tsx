"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Testimonial = { quote: string; body: string; author: string };

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

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
    <div className="relative">
      {/* Track */}
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((testimonial, index) => (
          <article
            key={testimonial.author}
            className={`flex w-full flex-shrink-0 snap-start flex-col gap-6 py-2 sm:w-1/2 sm:px-6 sm:py-6 xl:w-1/3 xl:px-7 xl:py-7 ${
              index < testimonials.length - 1 ? "border-r border-[#cfbcad]" : ""
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
              className="text-[18px] font-medium lg:text-[22px] lg:font-semibold leading-snug text-[#151515]"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              {testimonial.quote}
            </p>
            <p
              className="flex-1 text-[13px] lg:text-base leading-relaxed text-[#3d3d3d]"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              {testimonial.body}
            </p>
            <p
              className="text-sm font-medium text-[#151515]"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              {testimonial.author}
            </p>
          </article>
        ))}
      </div>

      {/* Left arrow */}
      <button
        onClick={() => scrollByCard(-1)}
        aria-label="Previous testimonial"
        className={`absolute left-0 top-1/2 z-10 -translate-x-5 -translate-y-1/2 sm:-translate-x-7 lg:-translate-x-10 xl:-translate-x-12 transition-opacity duration-300 ${
          !canPrev ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path d="M17 21L10 14L17 7" stroke="#151515" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        onClick={() => scrollByCard(1)}
        aria-label="Next testimonial"
        className={`absolute right-0 top-1/2 z-10 translate-x-5 -translate-y-1/2 sm:translate-x-7 lg:translate-x-10 xl:translate-x-12 transition-opacity duration-300 ${
          !canNext ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path d="M11 7L18 14L11 21" stroke="#151515" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
