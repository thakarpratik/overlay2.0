"use client";

import { useEditorStore } from "@/lib/editor/store";
import { exportAllAsZip, exportCurrentAsPng } from "@/lib/editor/export";

export default function ExportTab() {
  const images = useEditorStore((s) => s.images);
  const currentIndex = useEditorStore((s) => s.currentIndex);
  const setCurrentIndex = useEditorStore((s) => s.setCurrentIndex);

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium">Export</div>

      <button className="w-full rounded-xl bg-black text-white px-4 py-2" onClick={() => exportCurrentAsPng({ pixelRatio: 1 })}>
        Export PNG (current)
      </button>

      <button
        className="w-full rounded-xl border px-4 py-2 disabled:opacity-40"
        disabled={images.length <= 1}
        onClick={() =>
          exportAllAsZip(
            () =>
              images.map((_, idx) => ({
                name: `overlay-${String(idx + 1).padStart(3, "0")}.png`,
                beforeCapture: async () => {
                  setCurrentIndex(idx);
                  await new Promise((r) => setTimeout(r, 0));
                }
              })),
            { pixelRatio: 1 }
          )
        }
      >
        Export ZIP (all images)
      </button>

      <div className="text-xs text-neutral-600">Current: {currentIndex + 1}/{images.length || 1}</div>
    </div>
  );
}
