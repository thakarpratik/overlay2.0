export type CanvasSize = { width: number; height: number };

export type BaseLayer = {
  id: string;
  type: "text" | "shape";
  x: number; y: number; w: number; h: number;
  rotation?: number;
  opacity?: number;
};

export type TextLayer = BaseLayer & {
  type: "text";
  text: string;
  fontFamily: string;
  fontWeight: number;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  align: "left" | "center" | "right";
  color: string;
  textShadow?: string;
  stroke?: { color: string; width: number };
};

export type ShapeLayer = BaseLayer & {
  type: "shape";
  shape: "rect" | "pill" | "circle" | "arch";
  fill: string;
  radius: number;
  shadow?: "none" | "soft" | "medium";
  border?: { color: string; width: number };
};

export type OverlayLayer = TextLayer | ShapeLayer;

export type OverlayTemplate = {
  id: string;
  name: string;
  category: string;
  tags?: string[];
  canvas: CanvasSize;
  layers: OverlayLayer[];
};
