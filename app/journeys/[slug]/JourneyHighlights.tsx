"use client";

import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { useEffect, useRef, useState } from "react";
import { getTextAlign } from "../../../lib/portableText";

type ItineraryDay = {
  day: string;
  title: string;
  img: string;
  activities: any[];
};

// Alignment is applied via decorator marks (see lib/portableText), not as an
// inline wrapper — render them as inert pass-throughs so they don't show up
// as literal wrapped spans.
const alignMarks = {
  alignLeft: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
  alignCenter: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
  alignRight: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
};

// Activities are Portable Text now (bullet list, plain lines, sized via the
// editor's Normal/Small/Large style dropdown, aligned via the Align Left/
// Center/Right marks), not plain strings. Mobile and desktop just use
// different size scales, so this builds the PortableText `components` config
// for either from a { small, normal, large } size map.
type SizeMap = { small: string; normal: string; large: string };
type RichValue = { style?: string; children?: any[] };
const activitiesComponents = (sizes: SizeMap) => {
  const line = (sizeClass: string, align?: string) => ({ children }: { children?: React.ReactNode }) => (
    <p
      className={`${sizeClass} leading-relaxed text-dark-400`}
      style={{ fontFamily: "var(--font-secondary)", textAlign: align as React.CSSProperties["textAlign"] }}
    >
      {children}
    </p>
  );
  return {
    block: {
      normal: ({ children, value }: { children?: React.ReactNode; value: RichValue }) =>
        line(sizes.normal, getTextAlign(value))({ children }),
      small: ({ children, value }: { children?: React.ReactNode; value: RichValue }) =>
        line(sizes.small, getTextAlign(value))({ children }),
      large: ({ children, value }: { children?: React.ReactNode; value: RichValue }) =>
        line(sizes.large, getTextAlign(value))({ children }),
    },
    list: {
      // No items-center: that would center each <li> as a shrink-wrapped
      // block regardless of its own alignment, the same way it broke the
      // outer wrapper for normal blocks (see the two call sites' comments).
      // Default (stretch) makes every <li> full-width so its own
      // justify-content can actually move the bullet+text pair left/center/right.
      bullet: ({ children }: { children?: React.ReactNode }) => (
        <ul className="flex w-full flex-col gap-1">{children}</ul>
      ),
    },
    listItem: {
      bullet: ({ children, value }: { children?: React.ReactNode; value: RichValue }) => {
        const sizeClass = sizes[(value.style as keyof SizeMap) ?? "normal"] ?? sizes.normal;
        const align = getTextAlign(value) ?? "center";
        const justify = align === "left" ? "justify-start" : align === "right" ? "justify-end" : "justify-center";
        return (
          <li className={`${sizeClass} flex ${justify} items-baseline gap-2 leading-relaxed text-dark-400`} style={{ fontFamily: "var(--font-secondary)" }}>
            <span aria-hidden className="shrink-0">•</span>
            <span style={{ textAlign: align }}>{children}</span>
          </li>
        );
      },
    },
    marks: alignMarks,
  };
};

const CalendarIcon = () => (
  <svg width="26" height="27" viewBox="0 0 26 27" fill="none">
    <path d="M16.75 3.41667V0.75M16.75 3.41667V6.08333M16.75 3.41667H10.75M0.75 11.4167V23.4167C0.75 24.1239 1.03095 24.8022 1.53105 25.3023C2.03115 25.8024 2.70942 26.0833 3.41667 26.0833H22.0833C22.7906 26.0833 23.4689 25.8024 23.969 25.3023C24.469 24.8022 24.75 24.1239 24.75 23.4167V11.4167M0.75 11.4167H24.75M0.75 11.4167V6.08333C0.75 5.37609 1.03095 4.69781 1.53105 4.19772C2.03115 3.69762 2.70942 3.41667 3.41667 3.41667H6.08333M24.75 11.4167V6.08333C24.75 5.37609 24.469 4.69781 23.969 4.19772C23.4689 3.69762 22.7906 3.41667 22.0833 3.41667H21.4167M6.08333 0.75V6.08333" stroke="#6A5546" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronLeft = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export function JourneyHighlights({
  itinerary,
}: {
  itinerary: ItineraryDay[];
  journeyTitle: string;
}) {
  const [mobileActive, setMobileActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    /* Chrome scales the desktop layout via CSS `zoom` (see BrowserScaleShell),
       which native position:sticky already handles correctly — no JS needed.
       Safari can't use `zoom` reliably, so it falls back to transform:scale,
       and that breaks position:sticky (a WebKit bug: any transformed ancestor
       kills sticky).

       Tried GSAP ScrollTrigger for the Safari path (pin + scrub translate).
       It worked in every test here (Chromium with a spoofed Safari UA, which
       is the closest thing to real WebKit available in this environment) but
       did not engage at all on an actual Mac — no console errors, cards just
       rendered as a plain in-flow list. `pinType:"transform"` requires GSAP's
       own scroll listener to keep recalculating and re-applying a
       compensating transform every frame; something about that update loop
       isn't taking hold in real Safari under this page's nested
       position:absolute + transform:scale ancestor, and it isn't reproducible
       without a real device to debug on. So: plain scroll-driven JS instead,
       reading getBoundingClientRect (already correctly reflects both zoom and
       transform scaling) and writing transform directly — no library-internal
       scroll timing assumptions to go wrong.

       applyLayout(): cardH is the CSS-local height that renders as exactly
       one real viewport after the ancestor's scale shrinks it (winH / scale)
       — same reasoning as this codebase's `.min-h-screen` convention, just
       applied via JS since these cards are switching to position:absolute
       (sticky can't be mixed with manual absolute positioning). Each card is
       stacked at i * cardH, section's total height is N * cardH.

       onScroll(): each card's compensating translateY is capped by its own
       "slack" — (numCards - 1 - i) viewports, i.e. how many cards still
       follow it. The last card has zero slack (nothing follows it) so it's
       never rigidly pinned, and instead scrolls away continuously — matching
       what Chrome's native sticky already does for the same reason (its
       containing block runs out of room for the last item at the same
       point). Without this cap, the last card would freeze at y:0 and then
       hard-snap away the instant the section-exit guard below fires — which
       was the original reported bug, in both scroll directions. */
    const ua = window.navigator.userAgent;
    const isSafari =
      window.innerWidth >= 1280 &&
      /Safari/i.test(ua) &&
      !/Chrome|Chromium|Android/i.test(ua);
    if (!isSafari) return;

    const section = sectionRef.current;
    if (!section) return;

    const applyLayout = () => {
      const scale = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--desktop-browser-scale")) || 1;
      const winH  = window.innerHeight;
      const cardH = winH / scale;

      section.style.height = `${itinerary.length * cardH}px`;
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        card.style.position = "absolute";
        card.style.top      = `${i * cardH}px`;
        card.style.height   = `${cardH}px`;
        card.style.width    = "100%";
      });
    };

    const onScroll = () => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;

      const scale = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--desktop-browser-scale")) || 1;
      const winH  = window.innerHeight;

      /* Guard: section has fully left the viewport (above or below).
         Reset everything so cards don't bleed over adjacent sections. */
      if (rect.bottom <= 0 || rect.top >= winH) {
        cardRefs.current.forEach(card => {
          if (card) card.style.transform = "translateY(0px)";
        });
        if (headingRef.current) headingRef.current.style.transform = "translateY(0px)";
        return;
      }

      /* Heading: stays at viewport top, but capped by the same slack as the
         last card — (numCards - 1) viewports. Without this cap the heading
         stayed pinned for the section's full scroll budget, including the
         extra viewport reserved for the last card's exit, so it stayed
         frozen at the top while the last card was already scrolling away
         underneath it — visually disconnected from what it's labelling. This
         way the heading leaves together with the last card, not after it. */
      if (headingRef.current) {
        const headingSlack = (itinerary.length - 1) * winH;
        const compensation = Math.min(Math.max(-rect.top, 0), headingSlack);
        headingRef.current.style.transform = `translateY(${compensation / scale}px)`;
      }

      /* Cards: each stacks up as its natural visual top crosses zero, capped
         by its own slack (see comment above). */
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const naturalVisualTop = rect.top + i * winH;
        const slack = (itinerary.length - 1 - i) * winH;
        const compensation = Math.min(Math.max(-naturalVisualTop, 0), slack);
        card.style.transform = `translateY(${compensation / scale}px)`;
      });
    };

    applyLayout();
    requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", applyLayout);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", applyLayout);
    };
  }, [itinerary.length]);

  const mobile = itinerary[mobileActive];

  return (
    <>
      {/* ── Mobile / tablet ─────────────────────────────────────────────── */}
      <div className="flex flex-col gap-6 px-5 sm:px-8 pb-10 xl:hidden">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setMobileActive(d => Math.max(0, d - 1))}
            disabled={mobileActive === 0}
            className="p-2 text-[#999] disabled:opacity-30"
            aria-label="Previous day"
          >
            <ChevronLeft />
          </button>
          <div className="flex items-center gap-2">
            <CalendarIcon />
            <p className="text-[18px] font-semibold text-dark-500" style={{ fontFamily: "var(--font-secondary)" }}>
              {mobile.day}
            </p>
          </div>
          <button
            onClick={() => setMobileActive(d => Math.min(itinerary.length - 1, d + 1))}
            disabled={mobileActive === itinerary.length - 1}
            className="p-2 text-[#999] disabled:opacity-30"
            aria-label="Next day"
          >
            <ChevronRight />
          </button>
        </div>
        <div className="flex flex-col gap-4 text-center">
          <p className="text-[16px] font-semibold leading-snug text-dark-500" style={{ fontFamily: "var(--font-secondary)" }}>
            {mobile.title}
          </p>
          {/* No items-center: it would center each rendered line as a shrink-wrapped
              block regardless of its own text-align, making per-line alignment marks
              invisible. Default (stretch) makes each line full-width. */}
          <div className="flex flex-col gap-1">
            <PortableText
              value={mobile.activities}
              components={activitiesComponents({ small: "text-xs", normal: "text-[14px]", large: "text-lg" })}
            />
          </div>
        </div>
        <div className="relative h-65 w-full overflow-hidden rounded-xs">
          <Image src={mobile.img} alt={mobile.day} fill className="object-cover" sizes="100vw" />
        </div>
      </div>

      {/* ── Desktop — stacking cards ─────────────────────────────────────── */}
      {/*
        Outer div provides the scroll budget: N×100vh (scale-compensated, see effect above).
        Chrome: each card is position:sticky top-0 with increasing z-index — pure CSS stacking,
                no JS needed for positioning. The heading overlay (z-200) sits above all cards.
        Safari: CSS sticky is broken inside transform:scale. JS applyLayout sets each card to
                position:absolute and onScroll applies translateY to simulate sticking.
                A rect.bottom guard resets cards once the section fully exits the viewport,
                preventing the last card from bleeding over the next section.
      */}
      <div
        ref={sectionRef}
        className="hidden xl:block relative z-10"
        style={{ height: `calc(${itinerary.length} * 100vh / var(--desktop-browser-scale, 1))` }}
      >

        {/* Persistent heading — above all cards (z-200 > max card z-index) */}
        {/*
          height:0 so it doesn't push cards down; the h-40 heading is absolute-positioned
          into the right half. Each card reserves an identical h-40 spacer so content
          is centred in the space below the heading.

          Chrome's native sticky is constrained by its containing block, which by default
          would be the full N-card sectionRef — one viewport more slack than the last card
          gets (its own height eats into its share), so the heading stayed pinned a full
          extra screen after the last card had already scrolled away. This absolutely
          positioned wrapper (out of flow, so it doesn't push the cards down) gives the
          heading its own (N-1)-viewport containing block instead, matching the last card's
          slack so both release together — same fix as the Safari JS path's headingSlack.
        */}
        <div
          className="absolute top-0 left-0 w-full"
          style={{ height: `calc((${itinerary.length} - 1) * 100vh / var(--desktop-browser-scale, 1))` }}
        >
          <div
            ref={headingRef}
            className="sticky top-0 z-200 pointer-events-none"
            style={{ height: 0 }}
          >
            <div className="absolute top-0 right-0 w-1/2 h-40 flex items-end px-16 pb-4 bg-[#ece2d6]">
              <h2
                className="text-[24px] font-medium leading-tight text-dark-500 xl:text-[36px]"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                Journey Highlights
              </h2>
            </div>
          </div>
        </div>

        {/* Day cards */}
        {itinerary.map((entry, i) => (
          <div
            key={i}
            ref={el => { cardRefs.current[i] = el; }}
            className="sticky top-0 min-h-screen w-full flex"
            style={{ zIndex: i + 1 }}
          >
            {/* LEFT — full-height image with padding */}
            {/* No h-full: percentage heights don't reliably resolve against a
                min-height (vs. explicit height) flex container. Default
                align-items:stretch sizes this correctly without that issue. */}
            <div className="relative w-1/2 bg-[#ece2d6]">
              <div className="absolute inset-12 overflow-hidden">
                <Image
                  src={entry.img}
                  alt={entry.day}
                  fill
                  priority={i === 0}
                  className="object-cover"
                  sizes="50vw"
                />
                {/* Progress dots */}
                <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
                  {itinerary.map((_, j) => (
                    <div
                      key={j}
                      className="h-1.5 rounded-full"
                      style={{
                        width: j === i ? 24 : 6,
                        backgroundColor:
                          j === i   ? "white"
                          : j < i   ? "rgba(255,255,255,0.6)"
                                    : "rgba(255,255,255,0.3)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — content panel */}
            <div className="w-1/2 bg-[#ece2d6] flex flex-col">

              {/* Spacer that matches the persistent heading height */}
              <div className="h-40 shrink-0" />

              {/* Day detail — centred in the space below the heading */}
              <div className="flex-1 flex flex-col items-center justify-center gap-5 px-16 text-center">
                <div className="flex items-center gap-2">
                  <CalendarIcon />
                  <p
                    className="text-[22px] font-semibold text-dark-500"
                    style={{ fontFamily: "var(--font-secondary)" }}
                  >
                    {entry.day}
                  </p>
                </div>
                <p
                  className="text-[20px] font-medium text-dark-500"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  {entry.title}
                </p>
                {/* No items-center — see the mobile activities wrapper above for why. */}
                <div className="flex flex-col gap-1">
                  <PortableText
                    value={entry.activities}
                    components={activitiesComponents({ small: "text-sm", normal: "text-base", large: "text-xl" })}
                  />
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </>
  );
}
