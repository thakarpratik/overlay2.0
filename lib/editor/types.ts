export type LayerType = "text" | "shape";

export type BaseLayer = {
  id: string;
  type: LayerType;
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

export type ProjectImage = { id: string; src: string };

export type BrandKit = {
  fontFamily: string;
  primaryText: string;
  accent: string;
  shapeFill: string;
};

export type EditorState = {
  projectId: string;
  templateId: string;
  canvas: { width: number; height: number };
  images: ProjectImage[];
  currentIndex: number;
  layers: OverlayLayer[];
  selectedLayerId: string | null;
  brand: BrandKit;
};
