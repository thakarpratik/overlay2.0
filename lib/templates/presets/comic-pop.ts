import { OverlayTemplate } from "../schema";

export const comicPop: OverlayTemplate = {
  id: "comic-pop",
  name: "Comic Pop",
  category: "Bold",
  tags: ["comic", "pop-art", "bold", "fun", "action"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    // Yellow starburst background
    {
      id: "starburst-bg",
      type: "shape",
      shape: "rect",
      x: 0,
      y: 0,
      w: 1000,
      h: 1500,
      fill: "#fbbf24",
      radius: 0
    },
    // Main explosion shape (large circle)
    {
      id: "explosion-circle",
      type: "shape",
      shape: "circle",
      x: 100,
      y: 400,
      w: 800,
      h: 800,
      fill: "#ef4444",
      radius: 400,
      shadow: "medium"
    },
    // White inner circle
    {
      id: "inner-circle",
      type: "shape",
      shape: "circle",
      x: 180,
      y: 480,
      w: 640,
      h: 640,
      fill: "#ffffff",
      radius: 320,
      border: { color: "#000000", width: 8 }
    },
    // Main action text
    {
      id: "action-text",
      type: "text",
      x: 220,
      y: 620,
      w: 560,
      h: 360,
      text: "WOW!",
      fontFamily: "Impact, system-ui",
      fontWeight: 900,
      fontSize: 180,
      lineHeight: 1,
      letterSpacing: 8,
      align: "center",
      color: "#000000",
      stroke: { color: "#fbbf24", width: 8 }
    },
    // Top banner
    {
      id: "top-banner",
      type: "shape",
      shape: "rect",
      x: 100,
      y: 200,
      w: 800,
      h: 120,
      fill: "#000000",
      radius: 0,
      rotation: -3
    },
    {
      id: "top-text",
      type: "text",
      x: 150,
      y: 225,
      w: 700,
      h: 70,
      text: "AMAZING DEAL!",
      fontFamily: "Impact, system-ui",
      fontWeight: 900,
      fontSize: 56,
      lineHeight: 1,
      letterSpacing: 4,
      align: "center",
      color: "#ffffff",
      rotation: -3
    },
    // Bottom starburst text
    {
      id: "bottom-text",
      type: "text",
      x: 100,
      y: 1250,
      w: 800,
      h: 140,
      text: "LIMITED TIME!",
      fontFamily: "Impact, system-ui",
      fontWeight: 900,
      fontSize: 68,
      lineHeight: 1,
      letterSpacing: 6,
      align: "center",
      color: "#000000",
      stroke: { color: "#ffffff", width: 6 }
    },
    // Small decorative dots
    {
      id: "dot-1",
      type: "shape",
      shape: "circle",
      x: 150,
      y: 350,
      w: 40,
      h: 40,
      fill: "#000000",
      radius: 20
    },
    {
      id: "dot-2",
      type: "shape",
      shape: "circle",
      x: 810,
      y: 380,
      w: 50,
      h: 50,
      fill: "#000000",
      radius: 25
    },
    {
      id: "dot-3",
      type: "shape",
      shape: "circle",
      x: 120,
      y: 1150,
      w: 45,
      h: 45,
      fill: "#000000",
      radius: 22
    },
    {
      id: "dot-4",
      type: "shape",
      shape: "circle",
      x: 835,
      y: 1180,
      w: 40,
      h: 40,
      fill: "#000000",
      radius: 20
    }
  ]
};
