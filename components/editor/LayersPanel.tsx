"use client";

import { useEditorStore } from "@/lib/editor/store";

const layerIcon = (type: string) => {
  if (type === "text") return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 7 4 4 20 4 20 7" /><line x1="9" y1="20" x2="15" y2="20" /><line x1="12" y1="4" x2="12" y2="20" />
    </svg>
  );
  if (type === "shape") return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="4" />
    </svg>
  );
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
};

const layerLabel = (l: { type: string; text?: string; fill?: string }, idx: number) => {
  if (l.type === "text" && (l as any).text) {
    const t = (l as any).text as string;
    return t.length > 18 ? t.slice(0, 18) + "…" : t;
  }
  if (l.type === "shape") return "Shape";
  return `Layer ${idx + 1}`;
};

const typeColor: Record<string, string> = {
  text: "rgba(168,130,255,0.9)",
  shape: "rgba(80,180,255,0.9)",
};

export default function LayersPanel() {
  const layers = useEditorStore((s) => s.layers);
  const selectedLayerId = useEditorStore((s) => s.selectedLayerId);
  const selectLayer = useEditorStore((s) => s.selectLayer);

  const reversed = layers.slice().reverse();

  return (
    <div className="p-4 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
        </svg>
        <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Layers
        </span>
        <span
          style={{
            marginLeft: "auto",
            background: "rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.4)",
            fontSize: 10,
            borderRadius: 6,
            padding: "1px 7px",
          }}
        >
          {layers.length}
        </span>
      </div>

      {/* Layer list */}
      <div className="flex-1 space-y-1.5 overflow-y-auto">
        {reversed.map((l, i) => {
          const isSelected = selectedLayerId === l.id;
          const realIdx = layers.length - 1 - i;
          return (
            <button
              key={l.id}
              onClick={() => selectLayer(l.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 10px",
                borderRadius: 12,
                border: isSelected ? "1px solid rgba(168,130,255,0.45)" : "1px solid transparent",
                background: isSelected
                  ? "rgba(168,130,255,0.1)"
                  : "rgba(255,255,255,0.03)",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)";
              }}
              onMouseLeave={(e) => {
                if (!isSelected) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.03)";
              }}
            >
              {/* Type icon */}
              <span
                style={{
                  flexShrink: 0,
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: isSelected ? "rgba(168,130,255,0.2)" : "rgba(255,255,255,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: isSelected ? typeColor[l.type] ?? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.35)",
                }}
              >
                {layerIcon(l.type)}
              </span>

              {/* Label */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: isSelected ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.65)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {layerLabel(l, realIdx)}
                </div>
                <div style={{ fontSize: 10, color: isSelected ? typeColor[l.type] ?? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.25)", marginTop: 1, textTransform: "capitalize" }}>
                  {l.type}
                </div>
              </div>

              {/* Selected indicator dot */}
              {isSelected && (
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: typeColor[l.type] ?? "white", flexShrink: 0 }} />
              )}
            </button>
          );
        })}

        {layers.length === 0 && (
          <div style={{ padding: "32px 0", textAlign: "center" }}>
            <div style={{ color: "rgba(255,255,255,0.2)", fontSize: 12, lineHeight: 1.6 }}>
              No layers yet.<br />Add text or shapes<br />from a template.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
