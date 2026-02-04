import { OverlayTemplate } from "../schema";

export const magazineCover: OverlayTemplate = {
  id: "magazine-cover",
  name: "Magazine Cover",
  category: "Editorial",
  tags: ["magazine", "editorial", "elegant", "sophisticated"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    // Top bar
    {
      id: "top-bar",
      type: "shape",
      shape: "rectangle",
      x: 0,
      y: 0,
      w: 1000,
      h: 120,
      fill: "rgba(0,0,0,0.85)"
    },
    // Magazine title
    {
      id: "magazine-title",
      type: "text",
      x: 60,
      y: 30,
      w: 500,
      h: 60,
      text: "LIFESTYLE",
      fontFamily: "system-ui",
      fontWeight: 300,
      fontSize: 36,
      lineHeight: 1,
      letterSpacing: 12,
      align: "left",
      color: "#ffffff"
    },
    // Issue info
    {
      id: "issue",
      type: "text",
      x: 700,
      y: 35,
      w: 240,
      h: 50,
      text: "ISSUE 247",
      fontFamily: "system-ui",
      fontWeight: 500,
      fontSize: 16,
      lineHeight: 1,
      letterSpacing: 3,
      align: "right",
      color: "rgba(255,255,255,0.7)"
    },
    // Main headline box
    {
      id: "headline-bg",
      type: "shape",
      shape: "rectangle",
      x: 60,
      y: 900,
      w: 880,
      h: 480,
      fill: "rgba(255,255,255,0.95)",
      radius: 0
    },
    // Feature label
    {
      id: "feature-label",
      type: "text",
      x: 80,
      y: 930,
      w: 840,
      h: 40,
      text: "FEATURED STORY",
      fontFamily: "system-ui",
      fontWeight: 700,
      fontSize: 14,
      lineHeight: 1,
      letterSpacing: 4,
      align: "left",
      color: "#ef4444"
    },
    // Main headline
    {
      id: "headline",
      type: "text",
      x: 80,
      y: 990,
      w: 840,
      h: 260,
      text: "The Art of\nMindful Living",
      fontFamily: "system-ui",
      fontWeight: 300,
      fontSize: 78,
      lineHeight: 1.1,
      letterSpacing: -2,
      align: "left",
      color: "#000000"
    },
    // Subheadline
    {
      id: "subhead",
      type: "text",
      x: 80,
      y: 1260,
      w: 840,
      h: 80,
      text: "How to find peace in a chaotic world",
      fontFamily: "system-ui",
      fontWeight: 400,
      fontSize: 24,
      lineHeight: 1.3,
      letterSpacing: 0,
      align: "left",
      color: "#525252"
    },
    // Decorative line
    {
      id: "decor-line",
      type: "shape",
      shape: "rectangle",
      x: 80,
      y: 970,
      w: 120,
      h: 3,
      fill: "#ef4444"
    }
  ]
};
