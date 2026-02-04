import { OverlayTemplate } from "../schema";
export const modernCard: OverlayTemplate = {
  id: "modern-card",
  name: "Modern Card",
  category: "Wellness",
  tags: ["card","bottom","modern"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    { id: "shape-card", type: "shape", shape: "rect", x: 90, y: 980, w: 820, h: 360, fill: "rgba(255,255,255,0.90)", radius: 36, shadow: "medium" },
    { id: "text-card", type: "text", x: 140, y: 1040, w: 720, h: 260, text: "7 signs your gut\nneeds attention", fontFamily: "system-ui", fontWeight: 900, fontSize: 68, lineHeight: 0.98, letterSpacing: -1, align: "left", color: "#111111" }
  ]
};
