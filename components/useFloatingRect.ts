"use client";

import { useEffect, useState } from "react";

// This site's BrowserScaleShell scales the whole page down to fit a fixed
// reference canvas — via CSS `zoom` on <html> in Chrome, or `transform` on
// .browser-scale-shell in Safari (with a separate `zoom` re-applied to
// .modal-panel so modal content still visually matches the scaled-down page).
// Portal targets like #modal-root sit outside .browser-scale-shell, so a
// value read from getBoundingClientRect() (already in final on-screen pixels,
// whatever scale produced them) gets scaled a second time if reapplied
// verbatim as inline top/left on a portaled fixed-position element — unless
// that portaled element is rendered at the same scale #modal-root itself
// renders at, in which case no compensation is needed at all.
//
// Rather than track which of those two mechanisms (html zoom vs modal-panel
// zoom) applies to any given trigger — they need *opposite* handling, since
// html-zoom cascades into #modal-root's portaled content while modal-panel's
// scoped zoom does not — this measures #modal-root's actual rendering scale
// directly with a probe element. That's the one number that matters: it's
// the same scale the dropdown itself will render at once portaled there, in
// every mode, without needing to reason about which CSS mechanism produced it.
function modalRootScale(): number {
  const root = document.getElementById("modal-root");
  if (!root) return 1;
  const probe = document.createElement("div");
  probe.style.cssText = "position:absolute;top:0;left:0;width:1000px;height:0;visibility:hidden;pointer-events:none;";
  root.appendChild(probe);
  const measured = probe.getBoundingClientRect().width;
  root.removeChild(probe);
  return measured > 0 ? measured / 1000 : 1;
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
      const scale = modalRootScale();
      setRect({ top: (r.bottom + 4) / scale, left: r.left / scale, width: r.width / scale });
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
