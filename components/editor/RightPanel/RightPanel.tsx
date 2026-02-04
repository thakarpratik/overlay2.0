"use client";

import { useMemo, useState } from "react";
import { useEditorStore } from "@/lib/editor/store";
import TextTab from "./tabs/TextTab";
import ShapeTab from "./tabs/ShapeTab";
import ExportTab from "./tabs/ExportTab";
import BrandKitPanel from "./tabs/BrandKitPanel";

export default function RightPanel() {
  const selectedLayerId = useEditorStore((s) => s.selectedLayerId);
  const layers = useEditorStore((s) => s.layers);
  const [section, setSection] = useState<"properties" | "brand">("properties");

  const selected = useMemo(() => layers.find((l) => l.id === selectedLayerId) ?? null, [layers, selectedLayerId]);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Panel</div>
        <div className="flex gap-2">
          <button onClick={() => setSection("properties")} className={["text-xs rounded-full border px-3 py-1", section==="properties" ? "bg-black text-white border-black" : "bg-white"].join(" ")}>Properties</button>
          <button onClick={() => setSection("brand")} className={["text-xs rounded-full border px-3 py-1", section==="brand" ? "bg-black text-white border-black" : "bg-white"].join(" ")}>Brand Kit</button>
        </div>
      </div>

      <div className="mt-3">
        {section === "brand" ? (
          <BrandKitPanel />
        ) : (
          <>
            {!selected && <div className="text-sm text-neutral-600">Select a layer to edit.</div>}
            {selected?.type === "text" && <TextTab layerId={selected.id} />}
            {selected?.type === "shape" && <ShapeTab layerId={selected.id} />}
          </>
        )}
      </div>

      <div className="mt-6 border-t pt-4">
        <ExportTab />
      </div>
    </div>
  );
}
