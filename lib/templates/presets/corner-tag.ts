import { OverlayTemplate } from "../schema";
export const cornerTag: OverlayTemplate = {
  id: "corner-tag",
  name: "Corner Tag",
  category: "Fashion",
  tags: ["tag","label","corner"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    { id: "shape-tag", type: "shape", shape: "pill", x: 70, y: 90, w: 520, h: 150, fill: "rgba(255,255,255,0.92)", radius: 999, shadow: "soft" },
    { id: "text-tag", type: "text", x: 100, y: 115, w: 460, h: 110, text: "TRENDING NOW", fontFamily: "system-ui", fontWeight: 900, fontSize: 52, lineHeight: 1.0, letterSpacing: 0, align: "center", color: "#111111" }
  ]
};
