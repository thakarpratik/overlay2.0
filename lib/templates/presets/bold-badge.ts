import { OverlayTemplate } from "../schema";
export const boldBadge: OverlayTemplate = {
  id: "bold-badge",
  name: "Bold Center Badge",
  category: "Lifestyle",
  tags: ["badge","center","bold"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    { id: "shape-badge", type: "shape", shape: "circle", x: 150, y: 420, w: 700, h: 700, fill: "rgba(255,255,255,0.90)", radius: 999, shadow: "medium" },
    { id: "text-badge", type: "text", x: 220, y: 520, w: 560, h: 520, text: "15\nWARM AND\nCOMFORTABLE\nIDEAS", fontFamily: "system-ui", fontWeight: 900, fontSize: 72, lineHeight: 0.96, letterSpacing: -1, align: "center", color: "#111111" }
  ]
};
