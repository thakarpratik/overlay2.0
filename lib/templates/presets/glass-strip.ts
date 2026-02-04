import { OverlayTemplate } from "../schema";
export const glassStrip: OverlayTemplate = {
  id: "glass-strip",
  name: "Glass Strip",
  category: "Lifestyle",
  tags: ["glass","strip","bottom"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    { id: "shape-strip", type: "shape", shape: "rect", x: 0, y: 1080, w: 1000, h: 260, fill: "rgba(255,255,255,0.70)", radius: 0, shadow: "none" },
    { id: "text-strip", type: "text", x: 80, y: 1120, w: 840, h: 190, text: "18 earthy\nliving room ideas", fontFamily: "system-ui", fontWeight: 900, fontSize: 72, lineHeight: 0.95, letterSpacing: -1, align: "center", color: "#111111" }
  ]
};
