"use client";

import type { BgStyle } from "./TemplatePreviewMini";

export default function BgStyleToggle({
  value,
  onChange
}: {
  value: BgStyle;
  onChange: (v: BgStyle) => void;
}) {
  const options: { v: BgStyle; label: string }[] = [
    { v: "colorful", label: "Colorful" },
    { v: "neutral", label: "Neutral" },
    { v: "dark", label: "Dark" },
  ];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
      <span style={{ fontSize: ".75rem", color: "var(--mute)" }}>Ground</span>
      <div role="group" aria-label="Preview background" style={{ display: "flex", gap: 6 }}>
        {options.map(({ v, label }) => (
          <button
            key={v}
            type="button"
            className="chip"
            aria-pressed={value === v}
            onClick={() => onChange(v)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
