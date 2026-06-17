"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Journey } from "../app/site-data";

export function JourneysCarousel({ journeys }: { journeys: Journey[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [arrowTop, setArrowTop] = useState(0);

  const updateState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    const img = el.querySelector<HTMLElement>("[data-img]");
    if (img) setArrowTop(img.offsetTop + img.offsetHeight / 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const raf = requestAnimationFrame(updateState);
    const ro = new ResizeObserver(updateState);
    ro.observe(el);
    el.addEventListener("scroll", updateState, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", updateState);
      ro.disconnect();
    };
  }, [updateState]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("a");
    const amount = (card?.offsetWidth ?? 500) + 28;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-7 overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {journeys.map((journey, i) => (
          <Link
            key={journey.title}
            href={`/journeys/${journey.slug}`}
            className="group flex w-[78vw] flex-none flex-col gap-6 sm:w-[calc((100%-1.75rem)/2)] lg:w-[calc((100%-1.75rem)/2)]"
          >
            <div className="space-y-8">
              <div
                className="relative aspect-[1.2] lg:aspect-[1.7] overflow-hidden rounded-[2px]"
                {...(i === 0 ? { "data-img": "" } : {})}
              >
                <Image
                  src={journey.img}
                  alt={journey.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="space-y-4">
                <h3
                  className="text-[18px] lg:text-[27px] font-semibold  leading-tight text-[#151515]"
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  {journey.title}
                </h3>
                <p
                  className="text-[12px] lg:text-base leading-relaxed text-[#3d3d3d]"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  {journey.desc}
                </p>
              </div>
            </div>

            <div className="mt-auto space-y-6">
              <div
                className="rounded-[2px] px-5 py-4 sm:px-6"
                style={{ backgroundColor: journey.accent.replace("bg-[", "").replace("]", "") }}
              >
                <div className="space-y-3">
                  {journey.details.map(([label, value]) => (
                    <div
                      key={label}
                      className="flex flex-row gap-1 sm:flex-row items-center justify-between"
                    >
                      <span
                        className="text-[12px] lg:text-base text-[#3d3d3d]"
                        style={{ fontFamily: "var(--font-secondary)" }}
                      >
                        {label}
                      </span>
                      <span
                        className="text-[12px] lg:text-base text-[#151515]"
                        style={{ fontFamily: "var(--font-secondary)" }}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {canScrollLeft && arrowTop > 0 && (
        <button
          onClick={() => scroll("left")}
          aria-label="Previous journeys"
          className="absolute left-0 z-10 -translate-x-5 sm:-translate-x-7 lg:-translate-x-10 xl:-translate-x-12 -translate-y-1/2"
          style={{ top: arrowTop }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M17 21L10 14L17 7" stroke="#151515" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {canScrollRight && arrowTop > 0 && (
        <button
          onClick={() => scroll("right")}
          aria-label="Next journeys"
          className="absolute right-0 z-10 translate-x-5 sm:translate-x-7 lg:translate-x-10 xl:translate-x-12 -translate-y-1/2"
          style={{ top: arrowTop }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M11 7L18 14L11 21" stroke="#151515" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
