"use client";

import { useState } from "react";
import { useEditorStore } from "@/lib/editor/store";
import { exportAllAsZip, exportCurrentAsPng, waitForCurrentIndex } from "@/lib/editor/export";

export default function ExportTab() {
  const images = useEditorStore((s) => s.images);
  const currentIndex = useEditorStore((s) => s.currentIndex);
  const setCurrentIndex = useEditorStore((s) => s.setCurrentIndex);
  const [busy, setBusy] = useState(false);

  const hasMultiple = images.length > 1;
  const disabled = busy;

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
    if (busy || !hasMultiple) return;
    setBusy(true);
    try {
      await exportAllAsZip(
        () =>
          images.map((_, idx) => ({
            name: `overlay-${String(idx + 1).padStart(3, "0")}.png`,
            beforeCapture: async () => {
              setCurrentIndex(idx);
              await waitForCurrentIndex(idx);
            },
          })),
        { pixelRatio: 1 }
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        <span style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.35)", letterSpacing: "0.07em", textTransform: "uppercase" }}>
          Export
        </span>
        <span style={{
          marginLeft: "auto", fontSize: 10, color: "rgba(255,255,255,0.25)",
        }}>
          {currentIndex + 1} / {images.length || 1}
        </span>
      </div>

      <button
        disabled={disabled}
        onClick={runPng}
        style={{
          width: "100%",
          padding: "11px 0",
          borderRadius: 12,
          border: "none",
          cursor: disabled ? "not-allowed" : "pointer",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.04em",
          background: "linear-gradient(135deg, rgba(168,130,255,0.9) 0%, rgba(120,80,220,0.9) 100%)",
          color: "white",
          boxShadow: "0 4px 20px rgba(168,130,255,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 7,
          transition: "opacity 0.15s",
          opacity: disabled ? 0.6 : 1,
        }}
        onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.opacity = "0.85"; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = disabled ? "0.6" : "1"; }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        {busy ? "Exporting…" : "Export PNG"}
      </button>

      <button
        disabled={!hasMultiple || disabled}
        onClick={runZip}
        style={{
          width: "100%",
          padding: "10px 0",
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.1)",
          cursor: hasMultiple && !disabled ? "pointer" : "not-allowed",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.03em",
          background: hasMultiple ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)",
          color: hasMultiple ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 7,
          transition: "all 0.15s",
          opacity: disabled ? 0.7 : 1,
        }}
        onMouseEnter={(e) => { if (hasMultiple && !disabled) e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
        onMouseLeave={(e) => { if (hasMultiple) e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Export ZIP ({images.length} images)
      </button>
    </div>
  );
}
