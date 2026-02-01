"use client";

import { FONT_OPTIONS } from "@/lib/fonts";
import { useEditorStore } from "@/lib/editor/store";

export default function BrandKitPanel() {
  const brand = useEditorStore((s) => s.brand);
  const setBrand = useEditorStore((s) => s.setBrand);
  const applyBrandToAll = useEditorStore((s) => s.applyBrandToAll);
  const applyBrandToSelected = useEditorStore((s) => s.applyBrandToSelected);
  const selectedLayerId = useEditorStore((s) => s.selectedLayerId);

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium">Brand Kit</div>
      <div className="text-xs text-neutral-600">Set your default font + colors, then apply to selected or all layers.</div>

      <label className="text-xs text-neutral-600">
        Brand font
        <select
          className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
          value={brand.fontFamily}
          onChange={(e) => setBrand({ fontFamily: e.target.value })}
        >
          {FONT_OPTIONS.map((f) => (
            <option key={f.id} value={f.css}>{f.name}</option>
          ))}
        </select>
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="text-xs text-neutral-600">
          Primary text
          <input
            type="color"
            className="mt-1 h-10 w-full rounded-xl border px-2"
            value={brand.primaryText}
            onChange={(e) => setBrand({ primaryText: e.target.value })}
          />
        </label>

        <label className="text-xs text-neutral-600">
          Accent
          <input
            type="color"
            className="mt-1 h-10 w-full rounded-xl border px-2"
            value={brand.accent}
            onChange={(e) => setBrand({ accent: e.target.value })}
          />
        </label>
      </div>

      <label className="text-xs text-neutral-600">
        Shape fill (background)
        <input
          type="text"
          className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
          value={brand.shapeFill}
          onChange={(e) => setBrand({ shapeFill: e.target.value })}
          placeholder="rgba(255,255,255,0.9)"
        />
      </label>

      <div className="flex gap-2 pt-1">
        <button
          className="flex-1 rounded-xl border px-4 py-2 text-sm disabled:opacity-40"
          disabled={!selectedLayerId}
          onClick={applyBrandToSelected}
        >
          Apply to selected
        </button>
        <button className="flex-1 rounded-xl bg-black text-white px-4 py-2 text-sm" onClick={applyBrandToAll}>
          Apply to all
        </button>
      </div>

      <div className="rounded-xl border p-3 text-xs text-neutral-600">
        Tip: Use a slightly transparent shape fill for “Canva-style” overlays (e.g. <span className="font-mono">rgba(255,255,255,0.85)</span>).
      </div>
    </div>
  );
}
