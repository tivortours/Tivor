"use client";

import Image from "next/image";
import { useRef, useState } from "react";

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

export function GalleryCarousel({ images }: { images: [string, string] }) {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

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
            className={`relative h-[280px] w-[82vw] flex-none shrink-0 rounded-[2px] transition-opacity duration-500 sm:h-[380px] xl:h-[500px] xl:w-[1200px] ${
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
        className={`absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#cfbcad] bg-white text-[#151515] transition-all duration-300 hover:bg-[#151515] hover:text-white xl:left-[100px] ${
          current === 0 ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <ChevronLeft />
      </button>

      {/* Right arrow — visible only when not at end */}
      <button
        onClick={() => goTo(Math.min(images.length - 1, current + 1))}
        aria-label="Next image"
        className={`absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#cfbcad] bg-white text-[#151515] transition-all duration-300 hover:bg-[#151515] hover:text-white ${
          current >= images.length - 1 ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <ChevronRight />
      </button>
    </div>
  );
}
