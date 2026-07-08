"use client";

import { useEffect, useState } from "react";

// This site's BrowserScaleShell scales the whole page down (via CSS `zoom` on
// <html> at desktop widths) to fit a fixed reference canvas. `zoom` cascades to
// every descendant of <html> — including portal targets like #modal-root — so
// a value read from getBoundingClientRect() (already in final zoomed pixels)
// gets zoomed a second time when reapplied as inline top/left on a portaled
// fixed-position element. Dividing by the live zoom factor cancels that out.
// Safari's transform-based fallback doesn't have this problem (the transform
// is scoped to .browser-scale-shell, which #modal-root sits outside of), and
// there `zoom` reads back as unset/1, so the division is a no-op.
function currentZoom(): number {
  const raw = getComputedStyle(document.documentElement).zoom;
  const n = parseFloat(raw);
  return Number.isFinite(n) && n > 0 ? n : 1;
}

export function useFloatingRect(
  open: boolean,
  triggerRef: React.RefObject<HTMLElement | null>
) {
  const [rect, setRect] = useState<{ top: number; left: number; width: number } | null>(null);

  useEffect(() => {
    if (!open) return;
    function update() {
      const el = triggerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const zoom = currentZoom();
      setRect({ top: (r.bottom + 4) / zoom, left: r.left / zoom, width: r.width / zoom });
    }
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open, triggerRef]);

  return rect;
}
