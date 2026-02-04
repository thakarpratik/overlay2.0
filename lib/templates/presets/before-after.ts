import { OverlayTemplate } from "../schema";

export const beforeAfter: OverlayTemplate = {
  id: "before-after",
  name: "Before & After",
  category: "Transformation",
  tags: ["before-after", "transformation", "results", "comparison", "progress"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    // Vertical divider
    {
      id: "divider",
      type: "shape",
      shape: "rect",
      x: 495,
      y: 0,
      w: 10,
      h: 1500,
      fill: "#ffffff",
      radius: 0,
      shadow: "medium"
    },
    // "BEFORE" label left background
    {
      id: "before-bg",
      type: "shape",
      shape: "rect",
      x: 50,
      y: 100,
      w: 400,
      h: 100,
      fill: "rgba(0,0,0,0.75)",
      radius: 12
    },
    {
      id: "before-text",
      type: "text",
      x: 50,
      y: 120,
      w: 400,
      h: 60,
      text: "BEFORE",
      fontFamily: "system-ui",
      fontWeight: 900,
      fontSize: 48,
      lineHeight: 1,
      letterSpacing: 3,
      align: "center",
      color: "#ffffff"
    },
    // "AFTER" label right background
    {
      id: "after-bg",
      type: "shape",
      shape: "rect",
      x: 550,
      y: 100,
      w: 400,
      h: 100,
      fill: "rgba(16,185,129,0.9)",
      radius: 12
    },
    {
      id: "after-text",
      type: "text",
      x: 550,
      y: 120,
      w: 400,
      h: 60,
      text: "AFTER",
      fontFamily: "system-ui",
      fontWeight: 900,
      fontSize: 48,
      lineHeight: 1,
      letterSpacing: 3,
      align: "center",
      color: "#ffffff"
    },
    // Bottom result card
    {
      id: "result-card",
      type: "shape",
      shape: "rect",
      x: 100,
      y: 1250,
      w: 800,
      h: 180,
      fill: "rgba(255,255,255,0.95)",
      radius: 20,
      shadow: "medium"
    },
    // Result headline
    {
      id: "result-headline",
      type: "text",
      x: 140,
      y: 1280,
      w: 720,
      h: 120,
      text: "30 DAYS\nTRANSFORMATION",
      fontFamily: "system-ui",
      fontWeight: 900,
      fontSize: 42,
      lineHeight: 1.2,
      letterSpacing: 1,
      align: "center",
      color: "#1f2937"
    },
    // Arrow indicator
    {
      id: "arrow",
      type: "text",
      x: 450,
      y: 700,
      w: 100,
      h: 100,
      text: "→",
      fontFamily: "system-ui",
      fontWeight: 900,
      fontSize: 80,
      lineHeight: 1,
      letterSpacing: 0,
      align: "center",
      color: "#10b981",
      stroke: { color: "#ffffff", width: 4 }
    }
  ]
};
