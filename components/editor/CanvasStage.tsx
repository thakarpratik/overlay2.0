"use client";

import { useMemo, useRef } from "react";
import { useEditorStore } from "@/lib/editor/store";
import { clamp } from "@/lib/utils/clamp";

function shadowCss(kind?: "none" | "soft" | "medium") {
  if (!kind || kind === "none") return "none";
  if (kind === "soft") return "0 18px 40px rgba(0,0,0,.10)";
  return "0 22px 60px rgba(0,0,0,.16)";
}

type Handle = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";
const HANDLE_SIZE = 10;

export default function CanvasStage() {
  const stageRef = useRef<HTMLDivElement | null>(null);

  const canvas = useEditorStore((s) => s.canvas);
  const images = useEditorStore((s) => s.images);
  const currentIndex = useEditorStore((s) => s.currentIndex);
  const setCurrentIndex = useEditorStore((s) => s.setCurrentIndex);
  const layers = useEditorStore((s) => s.layers);
  const selectedLayerId = useEditorStore((s) => s.selectedLayerId);
  const selectLayer = useEditorStore((s) => s.selectLayer);
  const updateLayer = useEditorStore((s) => s.updateLayer);

  const currentImage = images[currentIndex];

  const displayWidth = 520;
  const scale = displayWidth / canvas.width;
  const displayHeight = Math.round(canvas.height * scale);

  const selected = useMemo(() => layers.find((l) => l.id === selectedLayerId) ?? null, [layers, selectedLayerId]);

  const onPointerDownLayer = (e: React.PointerEvent, layerId: string) => {
    e.stopPropagation();
    selectLayer(layerId);

    const startX = e.clientX;
    const startY = e.clientY;
    const layer = layers.find((x) => x.id === layerId);
    if (!layer) return;

    const ox = layer.x;
    const oy = layer.y;

    const onMove = (ev: PointerEvent) => {
      const dx = (ev.clientX - startX) / scale;
      const dy = (ev.clientY - startY) / scale;
      updateLayer(layerId, {
        x: clamp(ox + dx, 0, canvas.width - 10),
        y: clamp(oy + dy, 0, canvas.height - 10),
      });
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const onPointerDownResize = (e: React.PointerEvent, handle: Handle) => {
    e.stopPropagation();
    if (!selected) return;

    const id = selected.id;
    const startX = e.clientX;
    const startY = e.clientY;
    const ox = selected.x, oy = selected.y, ow = selected.w, oh = selected.h;
    const MIN = 24;

    const onMove = (ev: PointerEvent) => {
      const dx = (ev.clientX - startX) / scale;
      const dy = (ev.clientY - startY) / scale;
      let x = ox, y = oy, w = ow, h = oh;

      if (handle.includes("e")) w = clamp(ow + dx, MIN, canvas.width - ox);
      if (handle.includes("w")) { x = clamp(ox + dx, 0, ox + ow - MIN); w = clamp(ow - dx, MIN, ox + ow); }
      if (handle.includes("s")) h = clamp(oh + dy, MIN, canvas.height - oy);
      if (handle.includes("n")) { y = clamp(oy + dy, 0, oy + oh - MIN); h = clamp(oh - dy, MIN, oy + oh); }

      updateLayer(id, { x, y, w, h });
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const handles: { key: Handle; style: React.CSSProperties; cursor: string }[] = useMemo(() => {
    if (!selected) return [];
    const x = selected.x, y = selected.y, w = selected.w, h = selected.h;
    const hs = HANDLE_SIZE;

    const mk = (left: number, top: number, cursor: string, key: Handle) => ({
      key,
      cursor,
      style: {
        position: "absolute",
        left: left - hs / 2,
        top: top - hs / 2,
        width: hs,
        height: hs,
        borderRadius: 999,
        background: "#a882ff",
        border: "2px solid white",
        boxShadow: "0 2px 8px rgba(0,0,0,.4)",
      } as React.CSSProperties,
    });

    return [
      mk(x + w / 2, y, "ns-resize", "n"),
      mk(x + w / 2, y + h, "ns-resize", "s"),
      mk(x, y + h / 2, "ew-resize", "w"),
      mk(x + w, y + h / 2, "ew-resize", "e"),
      mk(x, y, "nwse-resize", "nw"),
      mk(x + w, y, "nesw-resize", "ne"),
      mk(x, y + h, "nesw-resize", "sw"),
      mk(x + w, y + h, "nwse-resize", "se"),
    ];
  }, [selected]);

  const canPrev = currentIndex > 0;
  const canNext = currentIndex < images.length - 1;

  return (
    <div className="p-4 flex flex-col h-full">
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" /><path d="m3 9 4-4 4 4 4-4 4 4" /><path d="M3 15h18" />
          </svg>
          <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Canvas</span>
        </div>

        {/* Prev / Next */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <button
            disabled={!canPrev}
            onClick={() => setCurrentIndex(currentIndex - 1)}
            style={{
              width: 28, height: 28, borderRadius: 8, border: "1px solid rgba(255,255,255,0.12)",
              background: canPrev ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.02)",
              color: canPrev ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center", cursor: canPrev ? "pointer" : "default",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", minWidth: 44, textAlign: "center" }}>
            {currentIndex + 1} / {images.length || 1}
          </span>

          <button
            disabled={!canNext}
            onClick={() => setCurrentIndex(currentIndex + 1)}
            style={{
              width: 28, height: 28, borderRadius: 8, border: "1px solid rgba(255,255,255,0.12)",
              background: canNext ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.02)",
              color: canNext ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center", cursor: canNext ? "pointer" : "default",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Canvas viewport */}
      <div className="flex justify-center mb-4">
        <div
          style={{
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.07)",
            position: "relative",
            width: displayWidth,
            height: displayHeight,
            background: "#111",
          }}
          onPointerDown={() => selectLayer(null)}
        >
          <div
            data-export-stage
            data-cw={canvas.width}
            data-ch={canvas.height}
            ref={stageRef}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: canvas.width,
              height: canvas.height,
              transformOrigin: "top left",
              transform: `scale(${scale})`,
            }}
          >
            {currentImage?.src ? (
              <img
                src={currentImage.src}
                alt=""
                crossOrigin="anonymous"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                draggable={false}
              />
            ) : (
              <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: "rgba(255,255,255,0.25)", fontSize: 13 }}>
                No image loaded
              </div>
            )}

            {layers.map((l) => {
              const isSelected = l.id === selectedLayerId;
              const commonStyle: React.CSSProperties = {
                position: "absolute",
                left: l.x,
                top: l.y,
                width: l.w,
                height: l.h,
                opacity: l.opacity ?? 1,
                transform: `rotate(${l.rotation ?? 0}deg)`,
                outline: isSelected ? "2px solid rgba(168,130,255,0.9)" : "none",
                outlineOffset: 2,
                cursor: "grab",
              };

              if (l.type === "shape") {
                const radius = l.shape === "circle" ? 9999 : l.radius ?? 24;
                const border = l.border ? `${l.border.width}px solid ${l.border.color}` : "none";
                return (
                  <div
                    key={l.id}
                    style={{ ...commonStyle, background: l.fill, borderRadius: radius, border, boxShadow: shadowCss(l.shadow) }}
                    onPointerDown={(e) => onPointerDownLayer(e, l.id)}
                  />
                );
              }

              const t = l as any;
              const stroke = t.stroke ? `${t.stroke.width}px ${t.stroke.color}` : undefined;

              return (
                <div
                  key={t.id}
                  style={{
                    ...commonStyle,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: t.align === "left" ? "flex-start" : t.align === "right" ? "flex-end" : "center",
                    padding: 12,
                    color: t.color,
                    fontFamily: t.fontFamily,
                    fontWeight: t.fontWeight,
                    fontSize: t.fontSize,
                    lineHeight: t.lineHeight,
                    letterSpacing: `${t.letterSpacing}px`,
                    textAlign: t.align,
                    whiteSpace: "pre-wrap",
                    userSelect: "none",
                    textShadow: t.textShadow,
                  }}
                  onPointerDown={(e) => onPointerDownLayer(e, t.id)}
                >
                  <span style={stroke ? ({ WebkitTextStroke: stroke } as any) : undefined}>{t.text}</span>
                </div>
              );
            })}

            {selected && (
              <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                {handles.map((h) => (
                  <div
                    key={h.key}
                    style={{ ...h.style, cursor: h.cursor, pointerEvents: "auto" }}
                    onPointerDown={(e) => onPointerDownResize(e, h.key)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Thumbnail filmstrip */}
      {images.length > 1 && (
        <div
          style={{
            display: "flex",
            gap: 6,
            overflowX: "auto",
            padding: "4px 2px",
            scrollbarWidth: "none",
          }}
        >
          {images.map((img, idx) => {
            const active = idx === currentIndex;
            return (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                style={{
                  flexShrink: 0,
                  width: 48,
                  height: 64,
                  borderRadius: 8,
                  overflow: "hidden",
                  border: active ? "2px solid rgba(168,130,255,0.9)" : "2px solid rgba(255,255,255,0.1)",
                  background: "#1a1a2e",
                  cursor: "pointer",
                  padding: 0,
                  position: "relative",
                  transition: "border-color 0.15s",
                }}
              >
                {img.src ? (
                  <img
                    src={img.src}
                    alt={`Image ${idx + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    draggable={false}
                  />
                ) : (
                  <div style={{ width: "100%", height: "100%", background: "rgba(255,255,255,0.05)" }} />
                )}
                {active && (
                  <div style={{ position: "absolute", inset: 0, background: "rgba(168,130,255,0.15)" }} />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Canvas size hint */}
      <div style={{ marginTop: 8, textAlign: "center", fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.04em" }}>
        {canvas.width} × {canvas.height}
      </div>
    </div>
  );
}
