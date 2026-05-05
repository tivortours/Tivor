"use client";

import { useLayoutEffect, useRef } from "react";

const DESKTOP_SCALE = 0.8;
const DESKTOP_BREAKPOINT = 1024;

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
  const shellRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const shell = shellRef.current;
    if (!shell) return;

    const clearScaleMode = () => {
      delete root.dataset.browserScale;
      root.style.removeProperty("--browser-scale-height");
    };

    const applyScaleMode = () => {
      if (!shouldUseTransformScale()) {
        clearScaleMode();
        return;
      }
      root.dataset.browserScale = "transform";
      root.style.setProperty(
        "--browser-scale-height",
        `${Math.ceil(shell.scrollHeight * DESKTOP_SCALE)}px`
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
  }, []);

  return (
    <div className="browser-scale-viewport">
      <div ref={shellRef} className="browser-scale-shell">
        {children}
      </div>
    </div>
  );
}
