// Sanity's block type doesn't support custom per-block fields here, so
// alignment is applied as a decorator mark (alignLeft/alignCenter/alignRight)
// the same way Bold/Italic are — editors select the whole line and apply one.
// This reads that back off a block's spans and turns it into a CSS
// text-align value, since the mark itself renders as an inert pass-through
// rather than an inline wrapper (text-align has no effect on inline elements).
const ALIGN_MARK_TO_VALUE: Record<string, "left" | "center" | "right"> = {
  alignLeft: "left",
  alignCenter: "center",
  alignRight: "right",
};

export function getTextAlign(block: { children?: any[] }): "left" | "center" | "right" | undefined {
  for (const child of block.children || []) {
    for (const mark of child?.marks || []) {
      const align = ALIGN_MARK_TO_VALUE[mark];
      if (align) return align;
    }
  }
  return undefined;
}
