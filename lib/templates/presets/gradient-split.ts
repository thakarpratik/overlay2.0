import { OverlayTemplate } from "../schema";

export const gradientSplit: OverlayTemplate = {
  id: "gradient-split",
  name: "Gradient Split",
  category: "Modern",
  tags: ["gradient", "bold", "diagonal", "dramatic"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    // Diagonal gradient overlay (left side)
    {
      id: "gradient-left",
      type: "shape",
      shape: "rect",
      x: -100,
      y: 0,
      w: 700,
      h: 1500,
      fill: "#6366f1",
      radius: 0,
      rotation: 8,
      opacity: 0.85
    },
    // Main headline - large and dramatic
    {
      id: "headline",
      type: "text",
      x: 60,
      y: 400,
      w: 880,
      h: 400,
      text: "TRANSFORM\nYOUR\nSPACE",
      fontFamily: "system-ui",
      fontWeight: 900,
      fontSize: 110,
      lineHeight: 0.9,
      letterSpacing: -3,
      align: "left",
      color: "#ffffff",
      stroke: { color: "rgba(0,0,0,0.2)", width: 2 }
    },
    // Subheadline with contrasting style
    {
      id: "subhead",
      type: "text",
      x: 60,
      y: 800,
      w: 500,
      h: 100,
      text: "in 30 days or less",
      fontFamily: "system-ui",
      fontWeight: 400,
      fontSize: 32,
      lineHeight: 1.2,
      letterSpacing: 0,
      align: "left",
      color: "rgba(255,255,255,0.95)"
    },
    // Bottom accent shape
    {
      id: "accent-bottom",
      type: "shape",
      shape: "rect",
      x: 60,
      y: 1350,
      w: 300,
      h: 8,
      fill: "#fbbf24",
      radius: 4
    }
  ]
};
