"use client";

import Image from "next/image";
import { useState } from "react";

type Experience = {
  title: string;
  country: string;
  img: string;
};

const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export function ExperiencesCarousel({ experiences }: { experiences: Experience[] }) {
  const [active, setActive] = useState(0);
  const exp = experiences[active];

  return (
    <>
      {/* ── Mobile: one card at a time ────────────────────────────────────── */}
      <div className="sm:hidden">

        {/* Card fills the same width as every other section (shell px-5 padding).
            Arrows sit absolutely over the image so they don't shrink the card. */}
        <div className="relative">
          <div className="flex flex-col overflow-hidden rounded-xs">
            <div className="relative h-[220px] w-full overflow-hidden">
              <Image
                src={exp.img}
                alt={exp.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw"
              />
            </div>
            <div className="flex flex-col gap-3 bg-white p-5">
              <p className="text-[12px] text-[#3d3d3d]" style={{ fontFamily: "var(--font-secondary)" }}>
                {exp.country}
              </p>
              <p className="text-[18px] leading-snug text-[#151515]" style={{ fontFamily: "var(--font-primary)" }}>
                {exp.title}
              </p>
            </div>
          </div>

          {/* Left arrow — vertically centred on the image */}
          <button
            onClick={() => setActive(i => Math.max(0, i - 1))}
            disabled={active === 0}
            className="absolute left-3 top-27.5 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-white/80 text-[#6A5546] shadow-sm disabled:opacity-25"
            aria-label="Previous experience"
          >
            <ChevronLeft />
          </button>

          {/* Right arrow — vertically centred on the image */}
          <button
            onClick={() => setActive(i => Math.min(experiences.length - 1, i + 1))}
            disabled={active === experiences.length - 1}
            className="absolute right-3 top-27.5 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-white/80 text-[#6A5546] shadow-sm disabled:opacity-25"
            aria-label="Next experience"
          >
            <ChevronRight />
          </button>
        </div>

       
      </div>

      {/* ── sm+ grid ─────────────────────────────────────────────────────── */}
      <div className="hidden sm:grid sm:grid-cols-2 sm:gap-7 xl:grid-cols-3">
        {experiences.map((item) => (
          <div key={item.title} className="flex flex-col overflow-hidden rounded-[2px]">
            <div className="relative h-[300px] lg:h-[320px] xl:h-[300px] w-full overflow-hidden">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 1280px) 50vw, 33vw"
              />
            </div>
            <div className="flex flex-1 flex-col items-start justify-between gap-4 bg-white p-6">
              <div className="flex flex-col gap-4">
                <p className="text-[13px] lg:text-sm text-[#3d3d3d]" style={{ fontFamily: "var(--font-secondary)" }}>
                  {item.country}
                </p>
                <p className="text-[20px] lg:text-[22px] leading-snug text-[#151515] xl:text-[24px]" style={{ fontFamily: "var(--font-primary)" }}>
                  {item.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
