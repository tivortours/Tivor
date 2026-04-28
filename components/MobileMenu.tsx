"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface NavItem { label: string; href: string }

export function MobileMenu({
  navItems,
  outlineAction,
  solidAction,
  active,
  logoSrc,
  light,
}: {
  navItems: NavItem[];
  outlineAction: { label: string; href: string };
  solidAction: { label: string; href: string };
  active?: string;
  logoSrc: string;
  light: boolean;
}) {
  const [open, setOpen] = useState(false);
  const barColor = light ? "bg-white" : "bg-[#151515]";

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex h-10 w-10 flex-col items-center justify-center gap-[5px]"
        aria-label="Open menu"
      >
        <span className={`block h-[1.5px] w-6 ${barColor}`} />
        <span className={`block h-[1.5px] w-6 ${barColor}`} />
        <span className={`block h-[1.5px] w-6 ${barColor}`} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#f2ebe2]">
          <div className="flex items-center justify-between px-5 py-5 sm:px-8">
            <Link href="/" onClick={() => setOpen(false)} className="relative block h-[23px] w-[152px] shrink-0">
              <Image src={logoSrc} alt="TIVOR" fill className="object-contain" />
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center text-[#151515]"
              aria-label="Close menu"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 2L18 18M18 2L2 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-1 flex-col divide-y divide-[#e0d5c8] px-5 sm:px-8">
            {navItems.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className={`py-4 text-[22px] text-[#151515] ${label === active ? "font-semibold" : ""}`}
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3 px-5 py-6 sm:px-8">
            <Link
              href={outlineAction.href}
              onClick={() => setOpen(false)}
              className="flex h-[45px] items-center justify-center rounded-[2px] border border-[#151515] text-base text-[#151515]"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              {outlineAction.label}
            </Link>
            <Link
              href={solidAction.href}
              onClick={() => setOpen(false)}
              className="flex h-[45px] items-center justify-center rounded-[2px] bg-[#151515] text-base text-white"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              {solidAction.label}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
