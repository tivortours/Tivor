"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

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

    // When scrolled to the bottom, always activate the last day
    if (container.scrollTop + container.clientHeight >= container.scrollHeight - 5) {
      setActiveDay(itinerary.length - 1);
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const threshold = containerRect.top + containerRect.height * 0.4;
    let active = 0;
    dayRefs.current.forEach((ref, i) => {
      if (!ref) return;
      if (ref.getBoundingClientRect().top <= threshold) active = i;
    });
    setActiveDay(active);
  }, [itinerary.length]);

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
            ref={(el) => { dayRefs.current[i] = el; }}
            className={`flex flex-col items-center justify-center gap-3 transition-opacity duration-300 ${
              i === activeDay ? "opacity-100" : "opacity-30"
            }`}
          >
            {/* Day header */}
            <div className="flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className={`shrink-0 transition-colors duration-300 ${i === activeDay ? "text-[#151515]" : "text-[#999]"}`}
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <p
                className={`text-[22px]  font-semibold transition-colors duration-300 ${
                  i === activeDay ? "text-[#151515]" : "text-[#999]"
                }`}
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                {entry.day}
              </p>
            </div>

            {/* Day title */}
            <p
              className={`text-[18px] font-medium transition-colors duration-300 ${
                i === activeDay ? "text-[#151515]" : "text-[#999]"
              }`}
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              {entry.title}
            </p>

            {/* Activities */}
            <div className="flex flex-col items-center justify-center">
              {entry.activities.map((act, j) => (
                <p
                  key={j}
                  className={` py-2 text-base leading-normal last:border-0 transition-colors duration-300 ${
                    i === activeDay ? "text-[#3d3d3d]" : "text-[#bbb]"
                  }`}
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
