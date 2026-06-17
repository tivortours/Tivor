"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type ItineraryDay = {
  day: string;
  title: string;
  img: string;
  activities: string[];
};

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.75 3.41667V0.75M16.75 3.41667V6.08333M16.75 3.41667H10.75M0.75 11.4167V23.4167C0.75 24.1239 1.03095 24.8022 1.53105 25.3023C2.03115 25.8024 2.70942 26.0833 3.41667 26.0833H22.0833C22.7906 26.0833 23.4689 25.8024 23.969 25.3023C24.469 24.8022 24.75 24.1239 24.75 23.4167V11.4167M0.75 11.4167H24.75M0.75 11.4167V6.08333C0.75 5.37609 1.03095 4.69781 1.53105 4.19772C2.03115 3.69762 2.70942 3.41667 3.41667 3.41667H6.08333M24.75 11.4167V6.08333C24.75 5.37609 24.469 4.69781 23.969 4.19772C23.4689 3.69762 22.7906 3.41667 22.0833 3.41667H21.4167M6.08333 0.75V6.08333" stroke="#6A5546" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

);

const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const DottedCurve = () => (
  <svg width="33" height="160" viewBox="0 0 33 160" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 0.828125C1 0.828125 31.9315 21.6851 31.9163 46.4115C31.8958 79.8281 1.02038 83.3281 1 117.357C0.985193 142.084 31.9163 158.828 31.9163 158.828" stroke="#BBA08A" strokeWidth="2" strokeDasharray="4 5"/>
</svg>

);

const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export function JourneyHighlights({
  itinerary,
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

  const current = itinerary[activeDay];

  return (
    <div>
      {/* ── Mobile layout ────────────────────────────────────────────── */}
      <div className="flex flex-col gap-6 xl:hidden">
        {/* Day navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setActiveDay((d) => Math.max(0, d - 1))}
            disabled={activeDay === 0}
            className="p-2 text-[#999] disabled:opacity-30"
            aria-label="Previous day"
          >
            <ChevronLeft />
          </button>

          <div className="flex items-center gap-2">
            <CalendarIcon className="text-dark-500" />
            <p
              className="text-[18px] font-semibold text-dark-500"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              {current.day}
            </p>
          </div>

          <button
            onClick={() => setActiveDay((d) => Math.min(itinerary.length - 1, d + 1))}
            disabled={activeDay === itinerary.length - 1}
            className="p-2 text-[#999] disabled:opacity-30"
            aria-label="Next day"
          >
            <ChevronRight />
          </button>
        </div>

        {/* Day title + activities */}
        <div className="flex flex-col gap-4 text-center">
          <p
            className="text-[16px] font-semibold leading-snug text-dark-500"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            {current.title}
          </p>
          <div className="flex flex-col items-center gap-1">
            {current.activities.map((act, j) => (
              <p
                key={j}
                className="text-[14px] leading-relaxed text-dark-400"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                {act}
              </p>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="relative h-65 w-full overflow-hidden rounded-xs">
          <Image
            src={current.img}
            alt={current.day}
            fill
            className="object-cover transition-opacity duration-500"
            sizes="100vw"
          />
        </div>
      </div>

      {/* ── Desktop layout (xl+) ─────────────────────────────────────── */}
      <div className="hidden xl:flex xl:gap-12">
        {/* Left — image crossfades with each day */}
        <div className="relative h-135 w-[48%] shrink-0 overflow-hidden rounded-xs">
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
              sizes="650px"
            />
          ))}
          {/* Day indicator dots */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {itinerary.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveDay(i);
                  dayRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeDay ? "w-6 bg-white" : "w-1.5 bg-white/50"
                }`}
                aria-label={`Go to ${itinerary[i].day}`}
              />
            ))}
          </div>
        </div>

        {/* Right — scrollable itinerary; scrolling drives the image */}
        <div
          ref={scrollRef}
          className="flex flex-col gap-5 overflow-y-auto xl:h-135 [&::-webkit-scrollbar]:hidden"
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
              <div className="flex items-center gap-2">
                <CalendarIcon
                  className={`shrink-0 transition-colors duration-300 ${
                    i === activeDay ? "text-dark-500" : "text-[#999]"
                  }`}
                />
                <p
                  className={`text-[22px] font-semibold transition-colors duration-300 ${
                    i === activeDay ? "text-dark-500" : "text-[#999]"
                  }`}
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  {entry.day}
                </p>
              </div>

              <p
                className={`text-[18px] font-medium transition-colors duration-300 ${
                  i === activeDay ? "text-dark-500" : "text-[#999]"
                }`}
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                {entry.title}
              </p>

              <div className="flex flex-col items-center justify-center">
                {entry.activities.map((act, j) => (
                  <p
                    key={j}
                    className={`py-2 text-base leading-normal last:border-0 transition-colors duration-300 ${
                      i === activeDay ? "text-[#3d3d3d]" : "text-[#bbb]"
                    }`}
                    style={{ fontFamily: "var(--font-secondary)" }}
                  >
                    {act}
                  </p>
                ))}
              </div>

              {i < itinerary.length - 1 && <DottedCurve />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
