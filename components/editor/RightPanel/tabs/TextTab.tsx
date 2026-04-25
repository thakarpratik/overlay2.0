"use client";

import { FONT_OPTIONS } from "@/lib/fonts";
import { useEditorStore } from "@/lib/editor/store";

const fieldLabel = (text: string) => (
  <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.35)", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 6 }}>
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

const WEIGHT_OPTIONS = [100, 200, 300, 400, 500, 600, 700, 800, 900];
const ALIGN_OPTIONS: { value: "left" | "center" | "right"; icon: React.ReactNode }[] = [
  {
    value: "left",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="15" y2="12" /><line x1="3" y1="18" x2="18" y2="18" />
      </svg>
    ),
  },
  {
    value: "center",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <line x1="3" y1="6" x2="21" y2="6" /><line x1="6" y1="12" x2="18" y2="12" /><line x1="4" y1="18" x2="20" y2="18" />
      </svg>
    ),
  },
  {
    value: "right",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <line x1="3" y1="6" x2="21" y2="6" /><line x1="9" y1="12" x2="21" y2="12" /><line x1="6" y1="18" x2="21" y2="18" />
      </svg>
    ),
  },
];

export default function TextTab({ layerId }: { layerId: string }) {
  const layer = useEditorStore((s) => s.layers.find((l) => l.id === layerId && l.type === "text") as any);
  const updateLayer = useEditorStore((s) => s.updateLayer);

  if (!layer) return null;

  const hasStroke = !!layer.stroke;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

      {/* Text content */}
      <div style={sectionStyle}>
        {fieldLabel("Content")}
        <textarea
          style={{ ...inputStyle, resize: "vertical", lineHeight: 1.5, fontFamily: "inherit" }}
          rows={4}
          value={layer.text}
          onChange={(e) => updateLayer(layerId, { text: e.target.value })}
        />
      </div>

      {/* Font */}
      <div style={sectionStyle}>
        {fieldLabel("Font")}
        <div style={{ position: "relative" }}>
          <select
            style={selectStyle}
            value={layer.fontFamily}
            onChange={(e) => updateLayer(layerId, { fontFamily: e.target.value })}
          >
            {FONT_OPTIONS.map((f) => (
              <option key={f.id} value={f.css}>{f.name}</option>
            ))}
            <option value={layer.fontFamily}>Custom (current)</option>
          </select>
          <svg style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "rgba(255,255,255,0.3)" }} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Size + Weight */}
      <div style={sectionStyle}>
        {fieldLabel("Size & Weight")}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 4 }}>Size (px)</div>
            <input
              type="number"
              style={inputStyle}
              value={layer.fontSize}
              onChange={(e) => updateLayer(layerId, { fontSize: Number(e.target.value) })}
            />
          </div>
          <div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 4 }}>Weight</div>
            <div style={{ position: "relative" }}>
              <select
                style={selectStyle}
                value={layer.fontWeight}
                onChange={(e) => updateLayer(layerId, { fontWeight: Number(e.target.value) })}
              >
                {WEIGHT_OPTIONS.map((w) => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
              <svg style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "rgba(255,255,255,0.3)" }} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Spacing */}
      <div style={sectionStyle}>
        {fieldLabel("Spacing")}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 4 }}>Line Height</div>
            <input
              type="number"
              step="0.05"
              style={inputStyle}
              value={layer.lineHeight}
              onChange={(e) => updateLayer(layerId, { lineHeight: Number(e.target.value) })}
            />
          </div>
          <div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 4 }}>Letter Spacing</div>
            <input
              type="number"
              step="0.5"
              style={inputStyle}
              value={layer.letterSpacing}
              onChange={(e) => updateLayer(layerId, { letterSpacing: Number(e.target.value) })}
            />
          </div>
        </div>
      </div>

      {/* Color + Align */}
      <div style={sectionStyle}>
        {fieldLabel("Color & Align")}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Color swatch */}
          <label style={{ position: "relative", cursor: "pointer" }}>
            <input
              type="color"
              style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
              value={layer.color}
              onChange={(e) => updateLayer(layerId, { color: e.target.value })}
            />
            <div style={{
              width: 36, height: 36, borderRadius: 10, background: layer.color,
              border: "2px solid rgba(255,255,255,0.12)", cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }} />
          </label>

          {/* Hex display */}
          <div style={{ ...inputStyle, flex: 1, display: "flex", alignItems: "center", height: 36, padding: "0 10px" }}>
            <span style={{ fontSize: 11, fontFamily: "monospace", color: "rgba(255,255,255,0.6)" }}>{layer.color}</span>
          </div>

          {/* Align buttons */}
          <div style={{ display: "flex", gap: 3 }}>
            {ALIGN_OPTIONS.map(({ value, icon }) => (
              <button
                key={value}
                onClick={() => updateLayer(layerId, { align: value })}
                style={{
                  width: 32, height: 36, borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)",
                  background: layer.align === value ? "rgba(168,130,255,0.18)" : "rgba(255,255,255,0.04)",
                  color: layer.align === value ? "rgba(168,130,255,1)" : "rgba(255,255,255,0.4)",
                  display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                }}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Shadow */}
      <div style={sectionStyle}>
        {fieldLabel("Text Shadow")}
        <div style={{ position: "relative" }}>
          <select
            style={selectStyle}
            value={layer.textShadow ?? "none"}
            onChange={(e) => {
              const v = e.target.value;
              updateLayer(layerId, { textShadow: v === "none" ? undefined : v });
            }}
          >
            <option value="none">None</option>
            <option value="0 6px 14px rgba(0,0,0,.25)">Soft</option>
            <option value="0 10px 24px rgba(0,0,0,.35)">Strong</option>
          </select>
          <svg style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "rgba(255,255,255,0.3)" }} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Outline / stroke */}
      <div style={{ ...sectionStyle, gap: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: hasStroke ? 12 : 0 }}>
          {fieldLabel("Outline")}
          <button
            onClick={() => updateLayer(layerId, { stroke: hasStroke ? undefined : { color: "#ffffff", width: 6 } })}
            style={{
              fontSize: 10, fontWeight: 600, borderRadius: 6, border: "1px solid rgba(255,255,255,0.12)",
              padding: "3px 10px", cursor: "pointer",
              background: hasStroke ? "rgba(168,130,255,0.15)" : "rgba(255,255,255,0.05)",
              color: hasStroke ? "rgba(168,130,255,0.9)" : "rgba(255,255,255,0.4)",
              marginBottom: hasStroke ? 0 : 0,
              marginTop: -2,
            }}
          >
            {hasStroke ? "Remove" : "Add"}
          </button>
        </div>

        {hasStroke && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 4 }}>Color</div>
              <label style={{ display: "block", position: "relative", cursor: "pointer" }}>
                <input
                  type="color"
                  style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
                  value={layer.stroke?.color ?? "#ffffff"}
                  onChange={(e) => updateLayer(layerId, { stroke: { color: e.target.value, width: layer.stroke?.width ?? 6 } })}
                />
                <div style={{ ...inputStyle, height: 36, borderRadius: 10, background: layer.stroke?.color ?? "#ffffff", cursor: "pointer", border: "2px solid rgba(255,255,255,0.12)" }} />
              </label>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 4 }}>Width</div>
              <input
                type="number"
                style={inputStyle}
                value={layer.stroke?.width ?? 6}
                onChange={(e) => updateLayer(layerId, { stroke: { color: layer.stroke?.color ?? "#ffffff", width: Number(e.target.value) } })}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
