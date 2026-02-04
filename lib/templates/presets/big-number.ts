import { OverlayTemplate } from "../schema";

export const bigNumber: OverlayTemplate = {
  id: "big-number",
  name: "Big Number",
  category: "Data",
  tags: ["statistics", "minimal", "bold", "data"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    // Massive number
    {
      id: "number",
      type: "text",
      x: 50,
      y: 200,
      w: 900,
      h: 600,
      text: "87%",
      fontFamily: "system-ui",
      fontWeight: 900,
      fontSize: 320,
      lineHeight: 0.9,
      letterSpacing: -8,
      align: "center",
      color: "#000000",
      opacity: 0.95
    },
    // Colored accent bar
    {
      id: "accent-bar",
      type: "shape",
      shape: "rect",
      x: 0,
      y: 750,
      w: 1000,
      h: 180,
      fill: "#6366f1"
    },
    // Main text on bar
    {
      id: "main-text",
      type: "text",
      x: 80,
      y: 780,
      w: 840,
      h: 120,
      text: "OF USERS SAW\nRESULTS IN 30 DAYS",
      fontFamily: "system-ui",
      fontWeight: 700,
      fontSize: 42,
      lineHeight: 1.2,
      letterSpacing: 1,
      align: "center",
      color: "#ffffff"
    },
    // Bottom source text
    {
      id: "source",
      type: "text",
      x: 100,
      y: 1000,
      w: 800,
      h: 60,
      text: "Based on 10,000+ users",
      fontFamily: "system-ui",
      fontWeight: 400,
      fontSize: 24,
      lineHeight: 1,
      letterSpacing: 0,
      align: "center",
      color: "#6b7280"
    }
  ]
};
