import { OverlayTemplate } from "../schema";
export const centerFrame: OverlayTemplate = {
  id: "center-frame",
  name: "Center Frame",
  category: "Lifestyle",
  tags: ["frame","center","title"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    { id: "shape-frame", type: "shape", shape: "rect", x: 120, y: 340, w: 760, h: 820, fill: "rgba(255,255,255,0.15)", radius: 36, shadow: "none", border: { color: "rgba(255,255,255,0.9)", width: 6 } },
    { id: "shape-title", type: "shape", shape: "rect", x: 160, y: 520, w: 680, h: 420, fill: "rgba(255,255,255,0.85)", radius: 28, shadow: "soft" },
    { id: "text", type: "text", x: 200, y: 590, w: 600, h: 280, text: "Cozy\nWeekend\nIdeas", fontFamily: "system-ui", fontWeight: 950, fontSize: 86, lineHeight: 0.92, letterSpacing: -1, align: "center", color: "#111111" }
  ]
};
