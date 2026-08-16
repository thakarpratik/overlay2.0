import type { CanvasSize, OverlayLayer } from "@/lib/editor/types";

export type { CanvasSize, BaseLayer, TextLayer, ShapeLayer, OverlayLayer, BrandRole } from "@/lib/editor/types";

export type OverlayTemplate = {
  id: string;
  name: string;
  category: string;
  tags?: string[];
  canvas: CanvasSize;
  layers: OverlayLayer[];
};
