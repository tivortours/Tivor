"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const CALENDAR_ICON = "https://www.figma.com/api/mcp/asset/56e3af8a-c17d-4436-9de7-244d1026cb6f";

type ItineraryDay = {
  day: string;
  title: string;
  img: string;
  activities: string[];
};

export function JourneyHighlights({
  itinerary,
  journeyTitle,
}: {
  itinerary: ItineraryDay[];
  journeyTitle: string;
}) {
  const [activeDay, setActiveDay] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dayRefs = useRef<(HTMLDivElement | null)[]>([]);

  const updateActiveDay = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    // The day whose top edge is closest to — but not past — 40% down the container
    const threshold = containerRect.top + containerRect.height * 0.4;
    let active = 0;
    dayRefs.current.forEach((ref, i) => {
      if (!ref) return;
      if (ref.getBoundingClientRect().top <= threshold) active = i;
    });
    setActiveDay(active);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener("scroll", updateActiveDay, { passive: true });
    return () => container.removeEventListener("scroll", updateActiveDay);
  }, [updateActiveDay]);

  return (
    <div className="flex flex-col gap-8 xl:flex-row xl:gap-12">
      {/* Left — image cross-fades with each day */}
      <div className="relative h-[280px] w-full flex-shrink-0 overflow-hidden rounded-[2px] sm:h-[380px] xl:h-[540px] xl:w-[48%]">
        {itinerary.map((entry, i) => (
          <Image
            key={i}
            src={entry.img}
            alt={entry.day}
            fill
            priority={i === 0}
            className={`object-cover transition-opacity duration-700 ${
              i === activeDay ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 1280px) 100vw, 650px"
          />
        ))}

        {/* Day indicator dots */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {itinerary.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveDay(i);
                const ref = dayRefs.current[i];
                ref?.scrollIntoView({ behavior: "smooth", block: "nearest" });
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeDay ? "w-6 bg-white" : "w-1.5 bg-white/50"
              }`}
              aria-label={`Go to ${itinerary[i].day}`}
            />
          ))}
        </div>
      </div>

      {/* Right — scrollable itinerary; scrolling drives image above */}
      <div
        ref={scrollRef}
        className="flex flex-col gap-5 overflow-y-auto xl:h-[540px] [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {itinerary.map((entry, i) => (
          <div
            key={entry.day}
            ref={(el) => {
              dayRefs.current[i] = el;
            }}
            className="flex flex-col gap-3"
          >
            {/* Day header */}
            <div className="flex items-center gap-2">
              <div className="relative h-5 w-5 shrink-0">
                <Image src={CALENDAR_ICON} alt="" fill className="object-contain" />
              </div>
              <p
                className="text-[18px] font-medium text-[#151515]"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                {entry.day}
              </p>
            </div>

            {/* Day title */}
            <p
              className="text-[18px] font-medium text-[#151515]"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              {entry.title}
            </p>

            {/* Activities */}
            <div className="flex flex-col">
              {entry.activities.map((act, j) => (
                <p
                  key={j}
                  className="border-b border-[#cfbcad]/50 py-2 text-base leading-normal text-[#3d3d3d] last:border-0"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  {act}
                </p>
              ))}
            </div>

            {/* Divider between days */}
            {i < itinerary.length - 1 && (
              <div className="mt-2 h-px w-full bg-[#cfbcad]/40" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
