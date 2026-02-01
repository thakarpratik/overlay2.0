import { OverlayTemplate } from "../schema";
export const boxedTitle: OverlayTemplate = {
  id: "boxed-title",
  name: "Boxed Title",
  category: "Lifestyle",
  tags: ["box","center","title"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    { id: "shape", type: "shape", shape: "rect", x: 90, y: 620, w: 820, h: 420, fill: "rgba(255,255,255,0.86)", radius: 36, shadow: "medium" },
    { id: "text", type: "text", x: 140, y: 700, w: 720, h: 280, text: "Weekend\nReset\nRoutine", fontFamily: "system-ui", fontWeight: 950, fontSize: 92, lineHeight: 0.9, letterSpacing: -1, align: "center", color: "#111111" }
  ]
};
