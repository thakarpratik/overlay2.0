import { OverlayTemplate } from "../schema";

export const neonGlow: OverlayTemplate = {
  id: "neon-glow",
  name: "Neon Glow",
  category: "Bold",
  tags: ["neon", "glow", "vibrant", "electric", "sale"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    // Dark overlay background
    {
      id: "dark-bg",
      type: "shape",
      shape: "rect",
      x: 0,
      y: 0,
      w: 1000,
      h: 1500,
      fill: "rgba(0,0,0,0.6)"
    },
    // Top neon text
    {
      id: "neon-top",
      type: "text",
      x: 80,
      y: 250,
      w: 840,
      h: 180,
      text: "FLASH",
      fontFamily: "system-ui",
      fontWeight: 900,
      fontSize: 140,
      lineHeight: 1,
      letterSpacing: 8,
      align: "center",
      color: "#ff00ff",
      stroke: "#ff00ff",
      strokeWidth: 3,
      shadow: "neon"
    },
    // Middle neon text
    {
      id: "neon-middle",
      type: "text",
      x: 80,
      y: 450,
      w: 840,
      h: 200,
      text: "SALE",
      fontFamily: "system-ui",
      fontWeight: 900,
      fontSize: 160,
      lineHeight: 1,
      letterSpacing: 12,
      align: "center",
      color: "#00ffff",
      stroke: "#00ffff",
      strokeWidth: 4,
      shadow: "neon"
    },
    // Percentage badge
    {
      id: "badge-bg",
      type: "shape",
      shape: "circle",
      x: 350,
      y: 700,
      w: 300,
      h: 300,
      fill: "#ff00ff",
      shadow: "neon"
    },
    {
      id: "percentage",
      type: "text",
      x: 350,
      y: 770,
      w: 300,
      h: 160,
      text: "50%\nOFF",
      fontFamily: "system-ui",
      fontWeight: 900,
      fontSize: 70,
      lineHeight: 1,
      letterSpacing: 2,
      align: "center",
      color: "#000000"
    },
    // Bottom tagline
    {
      id: "tagline",
      type: "text",
      x: 100,
      y: 1100,
      w: 800,
      h: 100,
      text: "TODAY ONLY",
      fontFamily: "system-ui",
      fontWeight: 700,
      fontSize: 48,
      lineHeight: 1,
      letterSpacing: 6,
      align: "center",
      color: "#ffffff"
    },
    // Accent lines
    {
      id: "line-1",
      type: "shape",
      shape: "rect",
      x: 300,
      y: 1200,
      w: 400,
      h: 4,
      fill: "#00ffff",
      shadow: "soft"
    }
  ]
};
