"use client";

import { useEditorStore } from "@/lib/editor/store";

export default function LayersPanel() {
  const layers = useEditorStore((s) => s.layers);
  const selectedLayerId = useEditorStore((s) => s.selectedLayerId);
  const selectLayer = useEditorStore((s) => s.selectLayer);

  return (
    <div className="p-4">
      <div className="text-sm font-medium">Layers</div>
      <div className="mt-3 space-y-2">
        {layers.slice().reverse().map((l) => (
          <button
            key={l.id}
            onClick={() => selectLayer(l.id)}
            className={[
              "w-full rounded-xl border px-3 py-2 text-left text-sm",
              selectedLayerId === l.id ? "border-black bg-neutral-50" : "border-neutral-200 hover:border-neutral-400"
            ].join(" ")}
          >
            <div className="font-medium">{l.type.toUpperCase()}</div>
            <div className="text-xs text-neutral-600">{l.id}</div>
          </button>
        ))}
        {layers.length === 0 && <div className="text-sm text-neutral-600">No layers</div>}
      </div>
    </div>
  );
}
