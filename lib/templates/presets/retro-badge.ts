import { OverlayTemplate } from "../schema";

export const retroBadge: OverlayTemplate = {
  id: "retro-badge",
  name: "Retro Badge",
  category: "Vintage",
  tags: ["retro", "vintage", "classic", "badge", "nostalgic"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    // Retro gradient background
    {
      id: "retro-bg",
      type: "shape",
      shape: "rect",
      x: 0,
      y: 0,
      w: 1000,
      h: 1500,
      fill: "#f59e0b",
      radius: 0
    },
    // Large circle badge
    {
      id: "badge-outer",
      type: "shape",
      shape: "circle",
      x: 150,
      y: 400,
      w: 700,
      h: 700,
      fill: "#fef3c7",
      radius: 350,
      shadow: "medium"
    },
    // Inner circle
    {
      id: "badge-inner",
      type: "shape",
      shape: "circle",
      x: 200,
      y: 450,
      w: 600,
      h: 600,
      fill: "rgba(245,158,11,0.1)",
      radius: 300,
      border: { color: "#f59e0b", width: 4 }
    },
    // Top curved text
    {
      id: "top-text",
      type: "text",
      x: 300,
      y: 520,
      w: 400,
      h: 80,
      text: "EST. 2020",
      fontFamily: "Georgia, serif",
      fontWeight: 700,
      fontSize: 36,
      lineHeight: 1,
      letterSpacing: 4,
      align: "center",
      color: "#92400e"
    },
    // Main badge text
    {
      id: "main-text",
      type: "text",
      x: 250,
      y: 680,
      w: 500,
      h: 240,
      text: "PREMIUM\nQUALITY",
      fontFamily: "Georgia, serif",
      fontWeight: 900,
      fontSize: 76,
      lineHeight: 1.1,
      letterSpacing: 2,
      align: "center",
      color: "#78350f"
    },
    // Bottom curved text
    {
      id: "bottom-text",
      type: "text",
      x: 300,
      y: 970,
      w: 400,
      h: 60,
      text: "GUARANTEED",
      fontFamily: "Georgia, serif",
      fontWeight: 700,
      fontSize: 28,
      lineHeight: 1,
      letterSpacing: 4,
      align: "center",
      color: "#92400e"
    },
    // Decorative star left
    {
      id: "star-left",
      type: "text",
      x: 280,
      y: 740,
      w: 60,
      h: 60,
      text: "★",
      fontFamily: "system-ui",
      fontWeight: 400,
      fontSize: 40,
      lineHeight: 1,
      letterSpacing: 0,
      align: "center",
      color: "#f59e0b"
    },
    // Decorative star right
    {
      id: "star-right",
      type: "text",
      x: 660,
      y: 740,
      w: 60,
      h: 60,
      text: "★",
      fontFamily: "system-ui",
      fontWeight: 400,
      fontSize: 40,
      lineHeight: 1,
      letterSpacing: 0,
      align: "center",
      color: "#f59e0b"
    }
  ]
};
