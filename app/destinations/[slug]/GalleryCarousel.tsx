"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

function ChevronLeft() {
  return (
    <svg width="38" height="38" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M17 21L10 14L17 7" stroke="#151515" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="38" height="38" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M11 7L18 14L11 21" stroke="#151515" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GalleryCarousel({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const updateCurrent = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.firstElementChild as HTMLElement | null;
    if (!slide) return;
    const offset = slide.offsetWidth + 20;
    const index = Math.round(track.scrollLeft / offset);
    setCurrent(Math.max(0, Math.min(index, images.length - 1)));
  }, [images.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", updateCurrent, { passive: true });
    return () => track.removeEventListener("scroll", updateCurrent);
  }, [updateCurrent]);

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.firstElementChild as HTMLElement | null;
    if (!slide) return;
    // slide offsetWidth + 20px gap between slides
    const offset = slide.offsetWidth + 20;
    track.scrollTo({ left: index * offset, behavior: "smooth" });
    setCurrent(index);
  };

  return (
    <div className="relative w-full">
      {/* Scrollable track — hidden scrollbar */}
      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto pl-5 sm:pl-8 lg:pl-12 xl:pl-[130px] [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className={`relative h-[250px] w-[82vw] flex-none shrink-0 rounded-[2px] transition-opacity duration-500 sm:h-[380px] xl:h-[500px] xl:w-[1200px] ${
              i === current ? "opacity-100" : "opacity-30"
            }`}
          >
            <Image
              src={src}
              alt=""
              fill
              className="rounded-[2px] object-cover"
              sizes="(max-width: 1280px) 82vw, 1200px"
            />
          </div>
        ))}
        {/* right-side breathing room so the last slide can scroll fully into view */}
        <div className="w-5 shrink-0 sm:w-8 lg:w-12 xl:w-[130px]" aria-hidden />
      </div>

      {/* Left arrow — visible only when not at start */}
      <button
        onClick={() => goTo(Math.max(0, current - 1))}
        aria-label="Previous image"
        className={`absolute cursor-pointer left-0 top-1/2 z-10 -translate-x-5 sm:-translate-x-7 lg:-translate-x-10 xl:-translate-x-12 -translate-y-1/2 transition-opacity duration-300 ${
          current === 0 ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <ChevronLeft />
      </button>

      {/* Right arrow — visible only when not at end */}
      <button
        onClick={() => goTo(Math.min(images.length - 1, current + 1))}
        aria-label="Next image"
        className={`absolute cursor-pointer right-0 top-1/2 z-10 translate-x-5 sm:translate-x-7 lg:translate-x-10 xl:translate-x-12 -translate-y-1/2 transition-opacity duration-300 ${
          current >= images.length - 1 ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <ChevronRight />
      </button>
    </div>
  );
}
