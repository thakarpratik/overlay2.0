"use client";

import type { BgStyle } from "./TemplatePreviewMini";

export default function BgStyleToggle({
  value,
  onChange
}: {
  value: BgStyle;
  onChange: (v: BgStyle) => void;
}) {
  const btn = (v: BgStyle, label: string) => (
    <button
      onClick={() => onChange(v)}
      className={[
        "rounded-full px-3 py-1 text-sm border transition",
        value === v ? "bg-black text-white border-black" : "bg-white hover:border-neutral-400"
      ].join(" ")}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-neutral-500 mr-1">Preview background</span>
      {btn("colorful", "Colorful")}
      {btn("neutral", "Neutral")}
      {btn("dark", "Dark")}
    </div>
  );
}
