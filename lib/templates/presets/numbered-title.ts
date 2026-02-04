import { OverlayTemplate } from "../schema";
export const numberedTitle: OverlayTemplate = {
  id: "numbered-title",
  name: "Numbered Title",
  category: "Home",
  tags: ["number","title","top"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    { id: "shape", type: "shape", shape: "rect", x: 90, y: 180, w: 820, h: 320, fill: "rgba(255,255,255,0.92)", radius: 36, shadow: "soft" },
    { id: "text", type: "text", x: 140, y: 220, w: 720, h: 240, text: "18\nEarthy Living Room Ideas", fontFamily: "system-ui", fontWeight: 950, fontSize: 72, lineHeight: 0.95, letterSpacing: -1, align: "center", color: "#111111" }
  ]
};
