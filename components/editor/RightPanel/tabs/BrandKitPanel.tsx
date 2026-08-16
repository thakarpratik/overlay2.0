"use client";

import { FONT_OPTIONS } from "@/lib/fonts";
import { useEditorStore } from "@/lib/editor/store";

const fieldLabel = (text: string) => (
  <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.35)", letterSpacing: "0.07em", textTransform: "uppercase" as const, marginBottom: 6 }}>
    {text}
  </div>
);

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 10,
  padding: "8px 10px",
  fontSize: 12,
  color: "rgba(255,255,255,0.85)",
  outline: "none",
  boxSizing: "border-box",
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  cursor: "pointer",
  appearance: "none",
  WebkitAppearance: "none",
};

const sectionStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 12,
  padding: "12px 12px 10px",
};

export default function BrandKitPanel() {
  const brand = useEditorStore((s) => s.brand);
  const setBrand = useEditorStore((s) => s.setBrand);
  const applyBrandToAll = useEditorStore((s) => s.applyBrandToAll);
  const applyBrandToSelected = useEditorStore((s) => s.applyBrandToSelected);
  const selectedLayerId = useEditorStore((s) => s.selectedLayerId);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {/* Description */}
      <div style={{
        ...sectionStyle,
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(168,130,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
          Set font, text, accent, and overlay-plate fill. Apply to all updates text plus light overlay plates — decorative shapes stay as-is. Accent updates layers already using the accent color.
        </div>
      </div>

      {/* Font */}
      <div style={sectionStyle}>
        {fieldLabel("Brand Font")}
        <div style={{ position: "relative" }}>
          <select
            style={selectStyle}
            value={brand.fontFamily}
            onChange={(e) => setBrand({ fontFamily: e.target.value })}
          >
            {FONT_OPTIONS.map((f) => (
              <option key={f.id} value={f.css}>{f.name}</option>
            ))}
          </select>
          <svg style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "rgba(255,255,255,0.3)" }} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Colors */}
      <div style={sectionStyle}>
        {fieldLabel("Colors")}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 4 }}>Primary Text</div>
            <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
              <input
                type="color"
                style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
                value={brand.primaryText}
                onChange={(e) => setBrand({ primaryText: e.target.value })}
              />
              <div style={{ width: 28, height: 28, borderRadius: 8, background: brand.primaryText, border: "2px solid rgba(255,255,255,0.12)", flexShrink: 0 }} />
              <span style={{ fontSize: 10, fontFamily: "monospace", color: "rgba(255,255,255,0.4)" }}>{brand.primaryText}</span>
            </label>
          </div>

          <div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 4 }}>Accent</div>
            <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
              <input
                type="color"
                style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
                value={brand.accent}
                onChange={(e) => setBrand({ accent: e.target.value })}
              />
              <div style={{ width: 28, height: 28, borderRadius: 8, background: brand.accent, border: "2px solid rgba(255,255,255,0.12)", flexShrink: 0 }} />
              <span style={{ fontSize: 10, fontFamily: "monospace", color: "rgba(255,255,255,0.4)" }}>{brand.accent}</span>
            </label>
          </div>
        </div>
      </div>

      {/* Shape fill */}
      <div style={sectionStyle}>
        {fieldLabel("Shape Fill")}
        <input
          type="text"
          style={inputStyle}
          value={brand.shapeFill}
          onChange={(e) => setBrand({ shapeFill: e.target.value })}
          placeholder="rgba(255,255,255,0.9)"
        />
        <div style={{ marginTop: 8, fontSize: 10, color: "rgba(255,255,255,0.25)", lineHeight: 1.5 }}>
          Try <span style={{ fontFamily: "monospace", color: "rgba(168,130,255,0.6)" }}>rgba(255,255,255,0.85)</span> for Canva-style overlays
        </div>
      </div>

      {/* Apply actions */}
      <div style={{ display: "flex", gap: 8 }}>
        <button
          disabled={!selectedLayerId}
          onClick={applyBrandToSelected}
          style={{
            flex: 1,
            padding: "10px 0",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.1)",
            cursor: selectedLayerId ? "pointer" : "not-allowed",
            fontSize: 12,
            fontWeight: 600,
            background: selectedLayerId ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)",
            color: selectedLayerId ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.2)",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => { if (selectedLayerId) e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
          onMouseLeave={(e) => { if (selectedLayerId) e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
        >
          Apply to selected
        </button>

        <button
          onClick={applyBrandToAll}
          style={{
            flex: 1,
            padding: "10px 0",
            borderRadius: 12,
            border: "none",
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 700,
            background: "linear-gradient(135deg, rgba(168,130,255,0.9) 0%, rgba(120,80,220,0.9) 100%)",
            color: "white",
            boxShadow: "0 4px 16px rgba(168,130,255,0.25)",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Apply to all
        </button>
      </div>
    </div>
  );
}
