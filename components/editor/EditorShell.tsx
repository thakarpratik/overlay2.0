"use client";

import CanvasStage from "@/components/editor/CanvasStage";
import LayersPanel from "@/components/editor/LayersPanel";
import RightPanel from "@/components/editor/RightPanel/RightPanel";

export default function EditorShell() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-5">
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_320px] gap-3 items-start">
        {/* Layers */}
        <div
          className="rounded-2xl min-h-[720px]"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
          }}
        >
          <LayersPanel />
        </div>

        {/* Canvas */}
        <div
          className="rounded-2xl min-h-[720px]"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(20px)",
          }}
        >
          <CanvasStage />
        </div>

        {/* Properties */}
        <div
          className="rounded-2xl min-h-[720px]"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
          }}
        >
          <RightPanel />
        </div>
      </div>
    </div>
  );
}
