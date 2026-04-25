"use client";

import { useMemo, useState } from "react";
import { useEditorStore } from "@/lib/editor/store";
import TextTab from "./tabs/TextTab";
import ShapeTab from "./tabs/ShapeTab";
import ExportTab from "./tabs/ExportTab";
import BrandKitPanel from "./tabs/BrandKitPanel";

const tabStyle = (active: boolean): React.CSSProperties => ({
  flex: 1,
  padding: "6px 0",
  fontSize: 11,
  fontWeight: 600,
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
  letterSpacing: "0.04em",
  transition: "all 0.15s",
  background: active ? "rgba(168,130,255,0.18)" : "transparent",
  color: active ? "rgba(168,130,255,1)" : "rgba(255,255,255,0.35)",
});

export default function RightPanel() {
  const selectedLayerId = useEditorStore((s) => s.selectedLayerId);
  const layers = useEditorStore((s) => s.layers);
  const [section, setSection] = useState<"properties" | "brand">("properties");

  const selected = useMemo(() => layers.find((l) => l.id === selectedLayerId) ?? null, [layers, selectedLayerId]);

  return (
    <div className="p-4 flex flex-col h-full gap-4">
      {/* Tab switcher */}
      <div
        style={{
          display: "flex",
          gap: 2,
          background: "rgba(255,255,255,0.05)",
          borderRadius: 10,
          padding: 3,
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <button style={tabStyle(section === "properties")} onClick={() => setSection("properties")}>
          Properties
        </button>
        <button style={tabStyle(section === "brand")} onClick={() => setSection("brand")}>
          Brand Kit
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {section === "brand" ? (
          <BrandKitPanel />
        ) : (
          <>
            {!selected && (
              <div
                style={{
                  padding: "40px 0",
                  textAlign: "center",
                  color: "rgba(255,255,255,0.2)",
                  fontSize: 12,
                  lineHeight: 1.7,
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 12px" }}>
                  <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                </svg>
                Select a layer<br />to edit properties
              </div>
            )}
            {selected?.type === "text" && <TextTab layerId={selected.id} />}
            {selected?.type === "shape" && <ShapeTab layerId={selected.id} />}
          </>
        )}
      </div>

      {/* Export — always visible at bottom */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          paddingTop: 16,
        }}
      >
        <ExportTab />
      </div>
    </div>
  );
}
