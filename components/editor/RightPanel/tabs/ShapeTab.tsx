"use client";

import { useEditorStore } from "@/lib/editor/store";

export default function ShapeTab({ layerId }: { layerId: string }) {
  const layer = useEditorStore((s) => s.layers.find((l) => l.id === layerId && l.type === "shape") as any);
  const updateLayer = useEditorStore((s) => s.updateLayer);

  if (!layer) return null;

  return (
    <div className="space-y-3">
      <label className="text-xs text-neutral-600">
        Fill
        <input
          type="text"
          className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
          value={layer.fill}
          onChange={(e) => updateLayer(layerId, { fill: e.target.value })}
          placeholder="rgba(255,255,255,0.9) or #ffffff"
        />
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="text-xs text-neutral-600">
          Radius
          <input
            type="number"
            className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
            value={layer.radius}
            onChange={(e) => updateLayer(layerId, { radius: Number(e.target.value) })}
          />
        </label>

        <label className="text-xs text-neutral-600">
          Opacity
          <input
            type="number"
            step="0.05"
            min="0"
            max="1"
            className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
            value={layer.opacity ?? 1}
            onChange={(e) => updateLayer(layerId, { opacity: Number(e.target.value) })}
          />
        </label>
      </div>

      <label className="text-xs text-neutral-600">
        Shadow
        <select
          className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
          value={layer.shadow ?? "none"}
          onChange={(e) => updateLayer(layerId, { shadow: e.target.value })}
        >
          <option value="none">None</option>
          <option value="soft">Soft</option>
          <option value="medium">Medium</option>
        </select>
      </label>
    </div>
  );
}
