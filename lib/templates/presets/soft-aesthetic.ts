import { OverlayTemplate } from "../schema";

export const softAesthetic: OverlayTemplate = {
  id: "soft-aesthetic",
  name: "Soft Aesthetic",
  category: "Lifestyle",
  tags: ["soft", "pastel", "dreamy", "aesthetic", "wellness"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    // Soft gradient blob 1
    {
      id: "blob-1",
      type: "shape",
      shape: "circle",
      x: -100,
      y: 200,
      w: 600,
      h: 600,
      fill: "rgba(251,207,232,0.5)",
      radius: 300,
      opacity: 0.6
    },
    // Soft gradient blob 2
    {
      id: "blob-2",
      type: "shape",
      shape: "circle",
      x: 500,
      y: 700,
      w: 700,
      h: 700,
      fill: "rgba(221,214,254,0.5)",
      radius: 350,
      opacity: 0.6
    },
    // Semi-transparent card
    {
      id: "card",
      type: "shape",
      shape: "rect",
      x: 100,
      y: 500,
      w: 800,
      h: 500,
      fill: "rgba(255,255,255,0.75)",
      radius: 40,
      shadow: "soft"
    },
    // Small decorative shape
    {
      id: "mini-accent",
      type: "shape",
      shape: "circle",
      x: 750,
      y: 480,
      w: 100,
      h: 100,
      fill: "#fbbf24",
      radius: 50,
      opacity: 0.6
    },
    // Main headline
    {
      id: "headline",
      type: "text",
      x: 140,
      y: 600,
      w: 720,
      h: 200,
      text: "Self-Care\nSunday",
      fontFamily: "system-ui",
      fontWeight: 300,
      fontSize: 76,
      lineHeight: 1.2,
      letterSpacing: -1,
      align: "center",
      color: "#4b5563"
    },
    // Decorative underline
    {
      id: "underline",
      type: "shape",
      shape: "rect",
      x: 400,
      y: 810,
      w: 200,
      h: 4,
      fill: "#ec4899",
      radius: 2
    },
    // Subtitle
    {
      id: "subtitle",
      type: "text",
      x: 140,
      y: 840,
      w: 720,
      h: 120,
      text: "5 rituals for inner peace",
      fontFamily: "system-ui",
      fontWeight: 400,
      fontSize: 28,
      lineHeight: 1.4,
      letterSpacing: 0,
      align: "center",
      color: "#9ca3af"
    },
    // Small floating element
    {
      id: "float-1",
      type: "shape",
      shape: "circle",
      x: 120,
      y: 450,
      w: 60,
      h: 60,
      fill: "rgba(167,243,208,0.6)",
      radius: 30
    }
  ]
};
