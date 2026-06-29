"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { shell, type Journey } from "../app/site-data";

function JourneyCard({ journey }: { journey: Journey }) {
  const LIMIT = 120;
  const preview = journey.desc.length > LIMIT
    ? journey.desc.slice(0, LIMIT).trimEnd() + "…"
    : journey.desc;
  const hasMore = journey.desc.length > LIMIT;
  const labelColor = journey.lightText ? "text-white/80" : "text-[#3d3d3d]";
  const valueColor = journey.lightText ? "text-white" : "text-[#151515]";

  return (
    <Link href={`/journeys/${journey.slug}`} className="group flex min-w-0 flex-1 flex-col justify-between">
      <div className="flex flex-col gap-8">
        <div className="relative h-[250px] lg:h-[422px] w-full overflow-hidden rounded-[2px]">
          <Image
            src={journey.img}
            alt={journey.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h3
            className="text-[20px] lg:text-[28px] font-semibold leading-tight text-[#151515]"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            {journey.title}
          </h3>
          <p className="text-[13px] lg:text-[16px] leading-normal text-[#3d3d3d]" style={{ fontFamily: "var(--font-secondary)" }}>
            {preview}
            {hasMore && (
              <span className="ml-1 text-dark-500 font-semibold" style={{ fontFamily: "var(--font-secondary)" }}>
                Read More
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-6">
        {/* {journey.hasDivider && <div className="h-px w-full bg-[#cfbcad]" />} */}
        <div
          className="rounded-[2px] px-6 py-4"
          style={{ backgroundColor: journey.accent.replace("bg-[", "").replace("]", "") }}
        >
          <div className="flex flex-col gap-2">
            {journey.details
              .filter(([label]) => /duration|best season|suited for/i.test(label))
              .map(([label, value]) => (
                <div key={label} className="flex items-start justify-between">
                  <span className={`text-[13px] lg:text-[16px] ${labelColor}`} style={{ fontFamily: "var(--font-secondary)" }}>
                    {label}
                  </span>
                  <span className={`text-right text-[13px] lg:text-[16px] ${valueColor}`} style={{ fontFamily: "var(--font-secondary)" }}>
                    {value}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

type Props = {
  journeys: Journey[];
  destNames: Record<string, string>;
  seeMoreLabel: string;
};

const DEST_PRIORITY = ["slovenia", "iceland", "norway"];
const destRank = (name: string) => {
  const i = DEST_PRIORITY.indexOf(name.toLowerCase());
  return i === -1 ? Infinity : i;
};

export function JourneyFilter({ journeys, destNames, seeMoreLabel }: Props) {
  const [selected, setSelected] = useState("all");
  const [open, setOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const options = useMemo(() => {
    const seen = new Set<string>();
    return journeys
      .filter((j) => j.destination && !seen.has(j.destination) && seen.add(j.destination))
      .map((j) => ({ slug: j.destination, name: destNames[j.destination] || j.destination }))
      .sort((a, b) => {
        const ra = destRank(a.name), rb = destRank(b.name);
        if (ra !== rb) return ra - rb;
        return a.name.localeCompare(b.name);
      });
  }, [journeys, destNames]);

  const filtered = useMemo(() => {
    const base = selected === "all" ? journeys : journeys.filter((j) => j.destination === selected);
    return [...base].sort((a, b) => {
      const an = destNames[a.destination] || a.destination;
      const bn = destNames[b.destination] || b.destination;
      const ra = destRank(an), rb = destRank(bn);
      if (ra !== rb) return ra - rb;
      if (an !== bn) return an.localeCompare(bn);
      return a.title.localeCompare(b.title);
    });
  }, [journeys, destNames, selected]);
  const visible = showAll ? filtered : filtered.slice(0, 6);

  const selectedLabel =
    selected === "all" ? "All Destinations" : destNames[selected] || selected;

  const select = (slug: string) => {
    setSelected(slug);
    setOpen(false);
    setShowAll(false);
  };

  return (
    <>
      {/* Dropdown */}
      <div ref={dropdownRef} className="relative w-full max-w-[488px] px-4 xl:px-0">
        <button
          onClick={() => setOpen((o) => !o)}
          className="cursor-pointer flex w-full items-center justify-between rounded-[2px] bg-white px-6 py-5"
        >
          <div className="flex items-center gap-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#151515]">
              <path
                d="M3 17v-2h6v2H3Zm0-5V10h12v2H3Zm0-5V5h18v2H3Zm14 10v-3h-2v-2h2v-3h2v3h2v2h-2v3h-2Z"
                fill="currentColor"
              />
            </svg>
            <span
              className={`text-[16px] ${selected === "all" ? "text-[#777]" : "text-[#151515]"}`}
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              {selectedLabel}
            </span>
          </div>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className={`shrink-0 text-[#151515] transition-transform duration-200 ${open ? "" : "rotate-180"}`}
          >
            <path d="M6 3.5 1.5 8h9L6 3.5Z" fill="currentColor" />
          </svg>
        </button>

        {open && (
          <div className="absolute left-4 right-4 top-full z-20 mt-1 overflow-hidden rounded-[2px] bg-white shadow-lg xl:left-0 xl:right-0">
            <button
              onClick={() => select("all")}
              className={`cursor-pointer flex w-full px-6 py-3 text-left text-[16px] hover:bg-[#f7f4f1] ${
                selected === "all" ? "font-medium text-[#151515]" : "text-[#777]"
              }`}
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              All Destinations
            </button>
            {options.map((opt) => (
              <button
                key={opt.slug}
                onClick={() => select(opt.slug)}
                className={`cursor-pointer flex w-full px-6 py-3 text-left text-[16px] hover:bg-[#f7f4f1] ${
                  selected === opt.slug ? "font-medium text-[#151515]" : "text-[#777]"
                }`}
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                {opt.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid */}
      <div className={`${shell} flex flex-col gap-10`}>
        <div className="h-px w-full bg-[#cfbcad] opacity-50" />
        <div className="grid grid-cols-1 gap-7 gap-y-20 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((card) => (
            <JourneyCard key={card.slug} journey={card} />
          ))}
        </div>
      </div>

      {/* See more */}
      {filtered.length > 6 && !showAll && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowAll(true)}
            className="h-[45px] rounded-[2px] bg-[#151515] px-6 text-[14px] lg:text-[18px] text-white"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            {seeMoreLabel}
          </button>
        </div>
      )}
    </>
  );
}
