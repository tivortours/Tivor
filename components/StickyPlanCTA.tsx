"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Mobile-only floating "Plan Your Journey" shortcut, pinned to the bottom of
// the viewport while scrolling. Hides once the page's own Final CTA section
// (id="final-cta") starts entering the viewport, and stays hidden for the
// rest of the page — that section links to the same /plan destination, so
// keeping both on screen at once would be redundant.
//
// Uses scroll position rather than IntersectionObserver: once the CTA
// section's top has scrolled above the bottom of the viewport, it stays
// above it for the remainder of the page, so this check stays hidden all
// the way down instead of flipping back on once the section scrolls fully
// past the top of the viewport.
export function StickyPlanCTA({
  label = "Contact Us",
  href = "/contact",
}: {
  label?: string;
  href?: string;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const target = document.getElementById("final-cta");
    if (!target) return;

    function update() {
      setVisible(target!.getBoundingClientRect().top > window.innerHeight);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-6 pb-4 transition-transform duration-300 lg:hidden ${
        visible ? "translate-y-0" : "translate-y-[150%]"
      }`}
    >
      <Link
        href={href}
        className="flex h-12 w-full items-center justify-center rounded-xs bg-[#824B2E] text-base text-white shadow-lg"
        style={{ fontFamily: "var(--font-secondary)" }}
      >
        {label}
      </Link>
    </div>
  );
}
