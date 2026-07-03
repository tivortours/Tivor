"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Journey } from "../../site-data";

const LIMIT = 110;

export function DestinationJourneyCarousel({ journeys }: { journeys: Journey[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const raf = requestAnimationFrame(sync);
    el.addEventListener("scroll", sync, { passive: true });
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", sync);
      ro.disconnect();
    };
  }, [sync]);

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("div[data-card]");
    const amount = (card?.offsetWidth ?? 380) + 20;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {journeys.map((j) => {

          return (
            <div
              key={j.title}
              data-card=""
              className="w-full shrink-0 snap-start flex flex-col justify-between rounded-xs border border-[#9f9f9f]/50 lg:w-[calc((100%-40px)/3)]"
            >
              <div className="flex flex-col gap-2">
                <div className="relative h-[260px] w-full overflow-hidden rounded-t-xs">
                  <Image
                    src={j.img}
                    alt={j.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 80vw, 33vw"
                  />
                </div>
                <div className="flex flex-col gap-2 px-6 pt-2">
                  <h3
                    className="text-[20px] lg:text-[22px] font-semibold text-dark-500 xl:text-[26px]"
                    style={{ fontFamily: "var(--font-primary)" }}
                  >
                    {j.title}
                  </h3>
                  
                </div>
              </div>

              <div>
                <div className="flex flex-col gap-2 px-6 py-5">
                  {j.details
                    .filter(([label]) => /duration|best season/i.test(label))
                    .map(([label, value]) => (
                      <div key={label} className="grid grid-cols-[auto_1fr] items-start gap-4">
                        <span
                          className="whitespace-nowrap text-[13px] lg:text-base text-dark-400"
                          style={{ fontFamily: "var(--font-secondary)" }}
                        >
                          {label}
                        </span>
                        <span
                          className="text-right text-[13px] lg:text-base text-dark-500"
                          style={{ fontFamily: "var(--font-secondary)" }}
                        >
                          {value}
                        </span>
                      </div>
                    ))}
                </div>
                <div className="border-t border-[#9f9f9f]/50 p-5">
                  <Link
                    href={`/journeys/${j.slug}`}
                    className="flex h-[45px] w-full items-center justify-center rounded-xs bg-[#824b2e] text-[15px] text-white lg:text-base xl:text-[18px]"
                    style={{ fontFamily: "var(--font-secondary)" }}
                  >
                    Explore Journey
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => scroll(-1)}
        aria-label="Previous journeys"
        className={`absolute left-0 top-1/2 z-10 -translate-x-5 -translate-y-1/2 cursor-pointer transition-opacity duration-300 sm:-translate-x-7 lg:-translate-x-10 xl:-translate-x-12 rounded-full bg-white/80 text-black shadow-sm disabled:opacity-25 ${
          canPrev ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <svg width="32" height="32" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path d="M17 21L10 14L17 7" stroke="#151515" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        onClick={() => scroll(1)}
        aria-label="Next journeys"
        className={`absolute right-0 top-1/2 z-10 translate-x-5 -translate-y-1/2 cursor-pointer transition-opacity duration-300 sm:translate-x-7 lg:translate-x-10 xl:translate-x-12 rounded-full bg-white/80 text-black shadow-sm disabled:opacity-25 ${
          canNext ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <svg width="32" height="32" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path d="M11 7L18 14L11 21" stroke="#151515" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
