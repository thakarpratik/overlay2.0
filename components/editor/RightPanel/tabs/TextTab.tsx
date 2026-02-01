"use client";

import { FONT_OPTIONS } from "@/lib/fonts";
import { useEditorStore } from "@/lib/editor/store";

export default function TextTab({ layerId }: { layerId: string }) {
  const layer = useEditorStore((s) => s.layers.find((l) => l.id === layerId && l.type === "text") as any);
  const updateLayer = useEditorStore((s) => s.updateLayer);

  if (!layer) return null;

  const hasStroke = !!layer.stroke;

  return (
    <div className="space-y-3">
      <div>
        <div className="text-xs font-medium text-neutral-600">Text</div>
        <textarea
          className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
          rows={5}
          value={layer.text}
          onChange={(e) => updateLayer(layerId, { text: e.target.value })}
        />
      </div>

      <label className="text-xs text-neutral-600">
        Font
        <select
          className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
          value={layer.fontFamily}
          onChange={(e) => updateLayer(layerId, { fontFamily: e.target.value })}
        >
          {FONT_OPTIONS.map((f) => (
            <option key={f.id} value={f.css}>{f.name}</option>
          ))}
          <option value={layer.fontFamily}>Custom (current)</option>
        </select>
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="text-xs text-neutral-600">
          Size
          <input
            type="number"
            className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
            value={layer.fontSize}
            onChange={(e) => updateLayer(layerId, { fontSize: Number(e.target.value) })}
          />
        </label>

        <label className="text-xs text-neutral-600">
          Weight
          <input
            type="number"
            step="50"
            className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
            value={layer.fontWeight}
            onChange={(e) => updateLayer(layerId, { fontWeight: Number(e.target.value) })}
          />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <label className="text-xs text-neutral-600">
          Line height
          <input
            type="number"
            step="0.05"
            className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
            value={layer.lineHeight}
            onChange={(e) => updateLayer(layerId, { lineHeight: Number(e.target.value) })}
          />
        </label>

        <label className="text-xs text-neutral-600">
          Letter spacing
          <input
            type="number"
            step="0.5"
            className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
            value={layer.letterSpacing}
            onChange={(e) => updateLayer(layerId, { letterSpacing: Number(e.target.value) })}
          />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <label className="text-xs text-neutral-600">
          Color
          <input
            type="color"
            className="mt-1 h-10 w-full rounded-xl border px-2"
            value={layer.color}
            onChange={(e) => updateLayer(layerId, { color: e.target.value })}
          />
        </label>

        <label className="text-xs text-neutral-600">
          Align
          <select
            className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
            value={layer.align}
            onChange={(e) => updateLayer(layerId, { align: e.target.value as "left" | "center" | "right" })}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </label>
      </div>

      <label className="text-xs text-neutral-600">
        Shadow
        <select
          className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
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
      </label>

      <div className="rounded-xl border p-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-medium text-neutral-700">Outline</div>
          <button
            className="text-xs rounded-lg border px-2 py-1"
            onClick={() => updateLayer(layerId, { stroke: hasStroke ? undefined : { color: "#ffffff", width: 6 } })}
          >
            {hasStroke ? "Remove" : "Add"}
          </button>
        </div>

        {hasStroke && (
          <div className="mt-3 grid grid-cols-2 gap-3">
            <label className="text-xs text-neutral-600">
              Stroke color
              <input
                type="color"
                className="mt-1 h-10 w-full rounded-xl border px-2"
                value={layer.stroke?.color ?? "#ffffff"}
                onChange={(e) => updateLayer(layerId, { stroke: { color: e.target.value, width: layer.stroke?.width ?? 6 } })}
              />
            </label>
            <label className="text-xs text-neutral-600">
              Stroke width
              <input
                type="number"
                className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                value={layer.stroke?.width ?? 6}
                onChange={(e) => updateLayer(layerId, { stroke: { color: layer.stroke?.color ?? "#ffffff", width: Number(e.target.value) } })}
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
