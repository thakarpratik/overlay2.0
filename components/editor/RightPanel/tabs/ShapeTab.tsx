"use client";

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

const SHADOW_OPTIONS = [
  { value: "none", label: "None" },
  { value: "soft", label: "Soft" },
  { value: "medium", label: "Medium" },
];

export default function ShapeTab({ layerId }: { layerId: string }) {
  const layer = useEditorStore((s) => s.layers.find((l) => l.id === layerId && l.type === "shape") as any);
  const updateLayer = useEditorStore((s) => s.updateLayer);

  if (!layer) return null;

  const fillIsColor = layer.fill && layer.fill.startsWith("#");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

      {/* Fill */}
      <div style={sectionStyle}>
        {fieldLabel("Fill")}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {fillIsColor && (
            <label style={{ position: "relative", cursor: "pointer", flexShrink: 0 }}>
              <input
                type="color"
                style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
                value={layer.fill}
                onChange={(e) => updateLayer(layerId, { fill: e.target.value })}
              />
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: layer.fill, border: "2px solid rgba(255,255,255,0.12)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)", cursor: "pointer",
              }} />
            </label>
          )}
          <input
            type="text"
            style={inputStyle}
            value={layer.fill}
            onChange={(e) => updateLayer(layerId, { fill: e.target.value })}
            placeholder="rgba(255,255,255,0.9) or #ffffff"
          />
        </div>
      </div>

      {/* Radius + Opacity */}
      <div style={sectionStyle}>
        {fieldLabel("Geometry")}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 4 }}>Corner Radius</div>
            <input
              type="number"
              style={inputStyle}
              value={layer.radius ?? 0}
              onChange={(e) => updateLayer(layerId, { radius: Number(e.target.value) })}
            />
          </div>
          <div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 4 }}>Opacity</div>
            <input
              type="number"
              step="0.05"
              min="0"
              max="1"
              style={inputStyle}
              value={layer.opacity ?? 1}
              onChange={(e) => updateLayer(layerId, { opacity: Number(e.target.value) })}
            />
          </div>
        </div>

        {/* Opacity slider */}
        <div style={{ marginTop: 8 }}>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={layer.opacity ?? 1}
            onChange={(e) => updateLayer(layerId, { opacity: Number(e.target.value) })}
            style={{ width: "100%", accentColor: "rgba(168,130,255,0.9)" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "rgba(255,255,255,0.2)", marginTop: 2 }}>
            <span>0%</span><span>{Math.round((layer.opacity ?? 1) * 100)}%</span><span>100%</span>
          </div>
        </div>
      </div>

      {/* Shadow */}
      <div style={sectionStyle}>
        {fieldLabel("Shadow")}
        <div style={{ display: "flex", gap: 6 }}>
          {SHADOW_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => updateLayer(layerId, { shadow: value as "none" | "soft" | "medium" })}
              style={{
                flex: 1,
                padding: "7px 0",
                borderRadius: 9,
                fontSize: 11,
                fontWeight: 500,
                border: "1px solid rgba(255,255,255,0.1)",
                cursor: "pointer",
                background: (layer.shadow ?? "none") === value ? "rgba(168,130,255,0.18)" : "rgba(255,255,255,0.04)",
                color: (layer.shadow ?? "none") === value ? "rgba(168,130,255,1)" : "rgba(255,255,255,0.4)",
                transition: "all 0.12s",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
