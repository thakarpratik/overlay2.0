import { OverlayLayer, ShapeLayer, TextLayer } from "./types";

function parseRgba(fill: string): { r: number; g: number; b: number; a: number } | null {
  const m = fill.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)$/i);
  if (!m) return null;
  return { r: Number(m[1]), g: Number(m[2]), b: Number(m[3]), a: m[4] === undefined ? 1 : Number(m[4]) };
}

export function isOverlayPlateFill(fill: string, previousShapeFill?: string): boolean {
  if (previousShapeFill && fill === previousShapeFill) return true;
  const rgba = parseRgba(fill);
  if (!rgba) return false;
  const luma = (rgba.r + rgba.g + rgba.b) / 3;
  return rgba.a < 0.98 && luma >= 200;
}

export function applyBrandToLayer(
  layer: OverlayLayer,
  brand: { fontFamily: string; primaryText: string; accent: string; shapeFill: string },
  previous: { primaryText: string; accent: string; shapeFill: string },
  mode: "all" | "selected"
): OverlayLayer {
  if (layer.type === "text") {
    const text = layer as TextLayer;
    const taggedAccent = text.brandRole === "accent";
    const wasAccent =
      previous.accent !== previous.primaryText && text.color === previous.accent;
    const useAccent = taggedAccent || wasAccent;
    return {
      ...text,
      fontFamily: brand.fontFamily,
      color: useAccent ? brand.accent : brand.primaryText,
    };
  }

  const shape = layer as ShapeLayer;
  if (mode === "selected") {
    const fill = shape.brandRole === "accent" ? brand.accent : brand.shapeFill;
    return { ...shape, fill };
  }

  if (shape.brandRole === "accent" || (previous.accent !== previous.primaryText && shape.fill === previous.accent)) {
    return { ...shape, fill: brand.accent };
  }
  if (shape.brandRole === "plate" || isOverlayPlateFill(shape.fill, previous.shapeFill)) {
    return { ...shape, fill: brand.shapeFill };
  }
  return shape;
}
