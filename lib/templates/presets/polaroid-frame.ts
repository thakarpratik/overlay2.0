import { OverlayTemplate } from "../schema";

export const polaroidFrame: OverlayTemplate = {
  id: "polaroid-frame",
  name: "Polaroid Frame",
  category: "Personal",
  tags: ["polaroid", "photo", "memories", "vintage", "travel"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    // Main polaroid frame
    {
      id: "polaroid",
      type: "shape",
      shape: "rectangle",
      x: 100,
      y: 300,
      w: 800,
      h: 900,
      fill: "#ffffff",
      radius: 8,
      shadow: "strong",
      rotation: -2
    },
    // Photo area (darker to show it's behind the image)
    {
      id: "photo-area",
      type: "shape",
      shape: "rectangle",
      x: 140,
      y: 340,
      w: 720,
      h: 720,
      fill: "rgba(0,0,0,0.05)",
      rotation: -2
    },
    // Handwritten style text
    {
      id: "caption",
      type: "text",
      x: 140,
      y: 1100,
      w: 720,
      h: 80,
      text: "best day ever ♡",
      fontFamily: "system-ui",
      fontWeight: 400,
      fontSize: 36,
      lineHeight: 1.2,
      letterSpacing: 0,
      align: "center",
      color: "#1f2937"
    },
    // Small decorative elements
    {
      id: "tape-1",
      type: "shape",
      shape: "rectangle",
      x: 450,
      y: 250,
      w: 100,
      h: 35,
      fill: "rgba(251,191,36,0.3)",
      rotation: -2
    },
    {
      id: "tape-2",
      type: "shape",
      shape: "rectangle",
      x: 450,
      y: 1230,
      w: 100,
      h: 35,
      fill: "rgba(251,191,36,0.3)",
      rotation: -2
    }
  ]
};
