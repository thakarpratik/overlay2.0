import { OverlayTemplate } from "../schema";

export const brutalistGeo: OverlayTemplate = {
  id: "brutalist-geo",
  name: "Brutalist Geo",
  category: "Bold",
  tags: ["brutalist", "geometric", "abstract", "bold", "fashion"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    // Large rotated rectangle
    {
      id: "geo-1",
      type: "shape",
      shape: "rect",
      x: -100,
      y: 200,
      w: 500,
      h: 800,
      fill: "#fbbf24",
      rotation: -15,
      opacity: 0.9
    },
    // Contrasting rectangle
    {
      id: "geo-2",
      type: "shape",
      shape: "rect",
      x: 600,
      y: 400,
      w: 450,
      h: 600,
      fill: "#000000",
      rotation: 8,
      opacity: 0.85
    },
    // Small accent square
    {
      id: "geo-3",
      type: "shape",
      shape: "rect",
      x: 350,
      y: 100,
      w: 200,
      h: 200,
      fill: "#ef4444",
      rotation: 45
    },
    // Bold headline - word 1
    {
      id: "text-1",
      type: "text",
      x: 80,
      y: 600,
      w: 840,
      h: 180,
      text: "BOLD",
      fontFamily: "system-ui",
      fontWeight: 900,
      fontSize: 140,
      lineHeight: 1,
      letterSpacing: 4,
      align: "left",
      color: "#ffffff",
      stroke: "#000000",
      strokeWidth: 4
    },
    // Bold headline - word 2
    {
      id: "text-2",
      type: "text",
      x: 80,
      y: 780,
      w: 840,
      h: 180,
      text: "MOVES",
      fontFamily: "system-ui",
      fontWeight: 900,
      fontSize: 140,
      lineHeight: 1,
      letterSpacing: 4,
      align: "left",
      color: "#000000",
      stroke: "#ffffff",
      strokeWidth: 3
    },
    // Small text overlay
    {
      id: "subtitle",
      type: "text",
      x: 100,
      y: 1000,
      w: 400,
      h: 80,
      text: "Spring 2026",
      fontFamily: "system-ui",
      fontWeight: 700,
      fontSize: 32,
      lineHeight: 1,
      letterSpacing: 2,
      align: "left",
      color: "#ffffff"
    },
    // Thin accent line
    {
      id: "line-accent",
      type: "shape",
      shape: "rect",
      x: 80,
      y: 1300,
      w: 600,
      h: 6,
      fill: "#fbbf24",
      rotation: -3
    }
  ]
};
