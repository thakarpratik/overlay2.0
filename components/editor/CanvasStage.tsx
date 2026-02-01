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

  const displayWidth = 560; // slightly larger = more "pro"
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
        y: clamp(oy + dy, 0, canvas.height - 10)
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

    const ox = selected.x;
    const oy = selected.y;
    const ow = selected.w;
    const oh = selected.h;

    const MIN = 24;

    const onMove = (ev: PointerEvent) => {
      const dx = (ev.clientX - startX) / scale;
      const dy = (ev.clientY - startY) / scale;

      let x = ox, y = oy, w = ow, h = oh;

      if (handle.includes("e")) w = clamp(ow + dx, MIN, canvas.width - ox);
      if (handle.includes("w")) {
        x = clamp(ox + dx, 0, ox + ow - MIN);
        w = clamp(ow - dx, MIN, ox + ow);
      }

      if (handle.includes("s")) h = clamp(oh + dy, MIN, canvas.height - oy);
      if (handle.includes("n")) {
        y = clamp(oy + dy, 0, oy + oh - MIN);
        h = clamp(oh - dy, MIN, oy + oh);
      }

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
        background: "white",
        border: "1px solid rgba(0,0,0,.35)",
        boxShadow: "0 4px 10px rgba(0,0,0,.10)"
      } as React.CSSProperties
    });

    return [
      mk(x + w / 2, y, "ns-resize", "n"),
      mk(x + w / 2, y + h, "ns-resize", "s"),
      mk(x, y + h / 2, "ew-resize", "w"),
      mk(x + w, y + h / 2, "ew-resize", "e"),
      mk(x, y, "nwse-resize", "nw"),
      mk(x + w, y, "nesw-resize", "ne"),
      mk(x, y + h, "nesw-resize", "sw"),
      mk(x + w, y + h, "nwse-resize", "se")
    ];
  }, [selected]);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-medium">Canvas</div>
        <div className="flex items-center gap-2">
          <button className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-40" disabled={currentIndex <= 0} onClick={() => setCurrentIndex(currentIndex - 1)}>Prev</button>
          <div className="text-xs text-neutral-600">{currentIndex + 1}/{images.length || 1}</div>
          <button className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-40" disabled={currentIndex >= images.length - 1} onClick={() => setCurrentIndex(currentIndex + 1)}>Next</button>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <div className="relative rounded-2xl overflow-hidden bg-neutral-100" style={{ width: displayWidth, height: displayHeight }} onPointerDown={() => selectLayer(null)}>
          <div
            data-export-stage
            data-cw={canvas.width}
            data-ch={canvas.height}
            ref={stageRef}
            className="absolute left-0 top-0 origin-top-left"
            style={{ width: canvas.width, height: canvas.height, transform: `scale(${scale})` }}
          >
            {currentImage?.src ? (
              <img src={currentImage.src} alt="" crossOrigin="anonymous" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
            ) : (
              <div className="absolute inset-0 grid place-items-center text-sm text-neutral-500">No image loaded</div>
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
                outline: isSelected ? "2px solid rgba(0,0,0,.55)" : "none",
                outlineOffset: 2,
                cursor: "grab"
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
                    textShadow: t.textShadow
                  }}
                  onPointerDown={(e) => onPointerDownLayer(e, t.id)}
                >
                  <span style={stroke ? ({ WebkitTextStroke: stroke } as any) : undefined}>{t.text}</span>
                </div>
              );
            })}

            {selected && (
              <div className="absolute inset-0 pointer-events-none">
                {handles.map((h) => (
                  <div key={h.key} className="pointer-events-auto" style={{ ...h.style, cursor: h.cursor }} onPointerDown={(e) => onPointerDownResize(e, h.key)} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 text-xs text-neutral-500 text-center">Canvas: {canvas.width}×{canvas.height} (2:3)</div>
    </div>
  );
}
