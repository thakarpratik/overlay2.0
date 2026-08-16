"use client";

import { useState } from "react";
import { useEditorStore } from "@/lib/editor/store";
import { exportAllAsZip, exportCurrentAsPng, waitForCurrentIndex } from "@/lib/editor/export";

export default function ExportTab() {
  const images = useEditorStore((s) => s.images);
  const currentIndex = useEditorStore((s) => s.currentIndex);
  const setCurrentIndex = useEditorStore((s) => s.setCurrentIndex);
  const [busy, setBusy] = useState(false);

  const runPng = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await exportCurrentAsPng({ pixelRatio: 1 });
    } finally {
      setBusy(false);
    }
  };

  const runZip = async () => {
    if (busy || images.length <= 1) return;
    setBusy(true);
    try {
      await exportAllAsZip(
        () =>
          images.map((_, idx) => ({
            name: `overlay-${String(idx + 1).padStart(3, "0")}.png`,
            beforeCapture: async () => {
              setCurrentIndex(idx);
              await waitForCurrentIndex(idx);
            }
          })),
        { pixelRatio: 1 }
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium">Export</div>

      <button className="w-full rounded-xl bg-black text-white px-4 py-2 disabled:opacity-40" disabled={busy} onClick={runPng}>
        {busy ? "Exporting…" : "Export PNG (current)"}
      </button>

      <button
        className="w-full rounded-xl border px-4 py-2 disabled:opacity-40"
        disabled={images.length <= 1 || busy}
        onClick={runZip}
      >
        Export ZIP (all images)
      </button>

      <div className="text-xs text-neutral-600">Current: {currentIndex + 1}/{images.length || 1}</div>
    </div>
  );
}
