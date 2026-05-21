"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const DESKTOP_BREAKPOINT = 1024;
// Lock the effective canvas to 1800px on every screen.
// Formula: zoom = viewport_width / REFERENCE_CANVAS
// Examples: 1440px → 0.80, 1728px → 0.96, 1920px → 1.00 (capped)
const REFERENCE_CANVAS = 1800;

function getScale(width: number): number {
  return Math.round((width / REFERENCE_CANVAS) * 1000) / 1000;
}

function shouldUseTransformScale() {
  if (typeof window === "undefined") return false;
  if (window.innerWidth < DESKTOP_BREAKPOINT) return false;

  const ua = window.navigator.userAgent;
  const isSafari = /Safari/i.test(ua) && !/Chrome|Chromium|Android/i.test(ua);
  return isSafari || !(window.CSS?.supports?.("zoom", "1") ?? false);
}

export function BrowserScaleShell({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const shellRef = useRef<HTMLDivElement>(null);
  const isStudio = pathname.startsWith("/studio");

  useLayoutEffect(() => {
    const root = document.documentElement;

    if (isStudio) {
      delete root.dataset.browserScale;
      root.style.removeProperty("--browser-scale-height");
      root.dataset.noScale = "true";
      return () => { delete root.dataset.noScale; };
    }

    delete root.dataset.noScale;
    const shell = shellRef.current;
    if (!shell) return;

    const clearScaleMode = () => {
      delete root.dataset.browserScale;
      root.style.removeProperty("--browser-scale-height");
      root.style.removeProperty("--desktop-browser-scale");
      root.style.removeProperty("zoom");
    };

    const applyScaleMode = () => {
      const width = window.innerWidth;

      if (width < DESKTOP_BREAKPOINT) {
        clearScaleMode();
        return;
      }

      const scale = getScale(width);
      root.style.setProperty("--desktop-browser-scale", String(scale));

      if (!shouldUseTransformScale()) {
        // Chrome / Firefox: CSS zoom, set as inline style to override the
        // static fallback value in globals.css
        root.style.zoom = String(scale);
        return;
      }

      // Safari: transform path
      root.dataset.browserScale = "transform";
      root.style.setProperty(
        "--browser-scale-height",
        `${Math.ceil(shell.scrollHeight * scale)}px`
      );
    };

    const resizeObserver = new ResizeObserver(applyScaleMode);
    resizeObserver.observe(shell);
    window.addEventListener("resize", applyScaleMode);
    applyScaleMode();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", applyScaleMode);
      clearScaleMode();
    };
  }, [isStudio]);

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <div className="browser-scale-viewport">
      <div ref={shellRef} className="browser-scale-shell">
        {children}
      </div>
    </div>
  );
}
