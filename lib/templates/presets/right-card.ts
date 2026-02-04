import { OverlayTemplate } from "../schema";
export const rightCard: OverlayTemplate = {
  id: "right-card",
  name: "Right Card",
  category: "Food",
  tags: ["sidebar","card","right"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    { id: "shape-card", type: "shape", shape: "rect", x: 520, y: 170, w: 420, h: 1160, fill: "rgba(255,255,255,0.88)", radius: 36, shadow: "soft" },
    { id: "text-card", type: "text", x: 560, y: 260, w: 340, h: 980, text: "Easy\nweekday\ndinners\n(in 20)\nminutes", fontFamily: "system-ui", fontWeight: 900, fontSize: 62, lineHeight: 0.95, letterSpacing: -1, align: "left", color: "#111111" }
  ]
};
