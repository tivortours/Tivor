"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { LinkBtn } from "../app/site-ui";
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
    const card = el.querySelector<HTMLElement>("article");
    const amount = (card?.offsetWidth ?? 340) + 28;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-7 overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {destinations.map((dest, i) => (
          <article
            key={dest.name}
            className="flex w-full flex-none flex-col md:w-[calc((100%-1.75rem)/2)] lg:w-[calc((100%-3.5rem)/3)]"
          >
            <div
              className="relative aspect-[0.92] overflow-hidden rounded-[2px]"
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
                  className="text-[27px] font-semibold leading-none text-black"
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  {dest.name}
                </h3>
                <p
                  className="text-sm leading-relaxed text-[#3d3d3d] text-justify hyphens-auto"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  {dest.blurb}
                </p>
              </div>
              <LinkBtn label="Inspire Me" href={`/destinations/${dest.slug}`} />
            </div>
          </article>
        ))}
      </div>

      {canScrollLeft && arrowTop > 0 && (
        <button
          onClick={() => scroll("left")}
          aria-label="Previous destinations"
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
          aria-label="Next destinations"
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
