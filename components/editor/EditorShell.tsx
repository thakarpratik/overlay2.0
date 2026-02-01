"use client";

import CanvasStage from "@/components/editor/CanvasStage";
import LayersPanel from "@/components/editor/LayersPanel";
import RightPanel from "@/components/editor/RightPanel/RightPanel";

export default function EditorShell() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_360px] gap-4">
        <div className="rounded-3xl border bg-white min-h-[720px] shadow-sm">
          <LayersPanel />
        </div>
        <div className="rounded-3xl border bg-white min-h-[720px] shadow-sm">
          <CanvasStage />
        </div>
        <div className="rounded-3xl border bg-white min-h-[720px] shadow-sm">
          <RightPanel />
        </div>
      </div>
    </div>
  );
}
