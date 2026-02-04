import { OverlayTemplate } from "../schema";

export const glassCard: OverlayTemplate = {
  id: "glass-card",
  name: "Glass Card",
  category: "Modern",
  tags: ["glass", "blur", "modern", "floating", "premium"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    // Large glassmorphic card
    {
      id: "glass-main",
      type: "shape",
      shape: "rect",
      x: 80,
      y: 400,
      w: 840,
      h: 700,
      fill: "rgba(255,255,255,0.15)",
      radius: 32,
      shadow: "strong",
      blur: 20
    },
    // Inner accent card
    {
      id: "glass-accent",
      type: "shape",
      shape: "rect",
      x: 120,
      y: 440,
      w: 760,
      h: 180,
      fill: "rgba(255,255,255,0.25)",
      radius: 20,
      blur: 10
    },
    // Number badge
    {
      id: "number",
      type: "text",
      x: 140,
      y: 460,
      w: 120,
      h: 140,
      text: "25",
      fontFamily: "system-ui",
      fontWeight: 900,
      fontSize: 100,
      lineHeight: 1,
      letterSpacing: -2,
      align: "center",
      color: "#ffffff"
    },
    // Main text
    {
      id: "main-text",
      type: "text",
      x: 280,
      y: 480,
      w: 560,
      h: 120,
      text: "SECRETS TO\nPERFECT PHOTOS",
      fontFamily: "system-ui",
      fontWeight: 900,
      fontSize: 42,
      lineHeight: 1.1,
      letterSpacing: -1,
      align: "left",
      color: "#ffffff"
    },
    // Description text
    {
      id: "description",
      type: "text",
      x: 140,
      y: 680,
      w: 720,
      h: 380,
      text: "Professional tips from\naward-winning photographers",
      fontFamily: "system-ui",
      fontWeight: 500,
      fontSize: 32,
      lineHeight: 1.4,
      letterSpacing: 0,
      align: "center",
      color: "rgba(255,255,255,0.9)"
    },
    // Small decorative circles
    {
      id: "circle-1",
      type: "shape",
      shape: "circle",
      x: 750,
      y: 350,
      w: 80,
      h: 80,
      fill: "rgba(251,191,36,0.6)",
      blur: 8
    },
    {
      id: "circle-2",
      type: "shape",
      shape: "circle",
      x: 120,
      y: 1050,
      w: 60,
      h: 60,
      fill: "rgba(236,72,153,0.6)",
      blur: 8
    }
  ]
};
