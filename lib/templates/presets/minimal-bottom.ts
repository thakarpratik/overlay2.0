import { OverlayTemplate } from "../schema";
export const minimalBottom: OverlayTemplate = {
  id: "minimal-bottom",
  name: "Minimal Bottom",
  category: "Quotes",
  tags: ["bottom","dark","minimal"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    { id: "shape", type: "shape", shape: "rect", x: 0, y: 1240, w: 1000, h: 260, fill: "rgba(0,0,0,0.45)", radius: 0, shadow: "none" },
    { id: "text", type: "text", x: 80, y: 1290, w: 840, h: 160, text: "Save this for later ✨", fontFamily: "system-ui", fontWeight: 800, fontSize: 60, lineHeight: 1.0, letterSpacing: -0.4, align: "center", color: "#ffffff" }
  ]
};
