import { OverlayTemplate } from "../schema";
export const leftPanel: OverlayTemplate = {
  id: "left-panel",
  name: "Left Panel",
  category: "Home",
  tags: ["panel","left","editorial"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    { id: "shape-panel", type: "shape", shape: "rect", x: 0, y: 0, w: 420, h: 1500, fill: "rgba(255,255,255,0.82)", radius: 0, shadow: "none" },
    { id: "text-panel", type: "text", x: 60, y: 240, w: 300, h: 900, text: "Warm\nScandi\nDesign\nIdeas", fontFamily: "system-ui", fontWeight: 900, fontSize: 76, lineHeight: 0.95, letterSpacing: -1, align: "left", color: "#111111" }
  ]
};
