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
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{
        fontSize: '.75rem', color: '#64748b',
        fontFamily: "'DM Sans', system-ui, sans-serif", whiteSpace: 'nowrap',
      }}>Preview bg</span>
      <div style={{
        display: 'flex', gap: 4, padding: '4px', borderRadius: 10,
        background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.08)',
      }}>
        {options.map(({ v, label }) => {
          const active = value === v;
          return (
            <button
              key={v}
              onClick={() => onChange(v)}
              style={{
                padding: '5px 12px', borderRadius: 7, fontSize: '.78rem', fontWeight: 500,
                border: 'none', cursor: 'pointer', transition: 'all .15s',
                background: active ? 'rgba(99,102,241,.25)' : 'transparent',
                color: active ? '#a5b4fc' : '#64748b',
                fontFamily: "'DM Sans', system-ui, sans-serif",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
