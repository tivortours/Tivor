"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Destination } from "../app/site-data";

export function DestinationsCarousel({ destinations }: { destinations: Destination[] }) {
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
    const cards = Array.from(el.querySelectorAll<HTMLElement>("a"));
    if (!cards.length) return;
    const scrollLeft = Math.round(el.scrollLeft);
    const currentIdx = cards.findIndex(c => c.offsetLeft >= scrollLeft - 4);
    const safeIdx = currentIdx < 0 ? cards.length - 1 : currentIdx;
    const targetIdx = dir === "left"
      ? Math.max(0, safeIdx - 1)
      : Math.min(cards.length - 1, safeIdx + 1);
    el.scrollTo({ left: cards[targetIdx].offsetLeft, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-7 snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {destinations.map((dest, i) => (
          <Link
            key={dest.name}
            href={`/destinations/${dest.slug}`}
            className="group flex w-full flex-none snap-start flex-col md:w-[calc((100%-1.75rem)/2)] lg:w-[calc((100%-3.5rem)/3)]"
          >
            <div
              className="relative aspect-[1.2] lg:aspect-[0.92] overflow-hidden rounded-[2px]"
              {...(i === 0 ? { "data-img": "" } : {})}
            >
              <Image
                src={dest.img}
                alt={dest.name}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between pt-5">
              <div className="space-y-3">
                <h3
                  className="text-[20px] lg:text-[27px] font-semibold leading-none text-black"
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  {dest.name}
                </h3>
                <p
                  className="text-[12px] sm:text-sm  text-[#3d3d3d] "
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  {dest.blurb}
                </p>
              </div>
              <div className="pt-2">

              <span
                className="inline-flex w-fit items-center border-b border-brown-700 pb-1 text-[12px] text-brown-700 sm:text-lg"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                Inspire Me
              </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {canScrollLeft && arrowTop > 0 && (
        <button
          onClick={() => scroll("left")}
          aria-label="Previous destinations"
          className="absolute cursor-pointer left-0 z-10 -translate-x-5 sm:-translate-x-7 lg:-translate-x-10 xl:-translate-x-12 -translate-y-1/2"
          style={{ top: arrowTop }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M17 21L10 14L17 7" stroke="#151515" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {canScrollRight && arrowTop > 0 && (
        <button
          onClick={() => scroll("right")}
          aria-label="Next destinations"
          className="absolute cursor-pointer right-0 z-10 translate-x-5 sm:translate-x-7 lg:translate-x-10 xl:translate-x-12 -translate-y-1/2"
          style={{ top: arrowTop }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M11 7L18 14L11 21" stroke="#151515" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
