import { OverlayTemplate } from "../schema";

export const minimalType: OverlayTemplate = {
  id: "minimal-type",
  name: "Minimal Typography",
  category: "Minimal",
  tags: ["minimal", "clean", "typography", "elegant", "simple"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    // Clean white background overlay
    {
      id: "white-overlay",
      type: "shape",
      shape: "rect",
      x: 0,
      y: 0,
      w: 1000,
      h: 1500,
      fill: "rgba(255,255,255,0.92)",
      radius: 0
    },
    // Top thin line
    {
      id: "line-top",
      type: "shape",
      shape: "rect",
      x: 200,
      y: 300,
      w: 600,
      h: 2,
      fill: "#000000",
      radius: 0
    },
    // Main headline
    {
      id: "headline",
      type: "text",
      x: 100,
      y: 380,
      w: 800,
      h: 500,
      text: "LESS\nIS\nMORE",
      fontFamily: "system-ui",
      fontWeight: 300,
      fontSize: 120,
      lineHeight: 1.1,
      letterSpacing: 20,
      align: "center",
      color: "#000000"
    },
    // Bottom thin line
    {
      id: "line-bottom",
      type: "shape",
      shape: "rect",
      x: 200,
      y: 1000,
      w: 600,
      h: 2,
      fill: "#000000",
      radius: 0
    },
    // Small subtext
    {
      id: "subtext",
      type: "text",
      x: 200,
      y: 1050,
      w: 600,
      h: 60,
      text: "DESIGN PHILOSOPHY",
      fontFamily: "system-ui",
      fontWeight: 400,
      fontSize: 18,
      lineHeight: 1,
      letterSpacing: 6,
      align: "center",
      color: "#6b7280"
    }
  ]
};
