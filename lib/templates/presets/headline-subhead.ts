import { OverlayTemplate } from "../schema";
export const headlineSubhead: OverlayTemplate = {
  id: "headline-subhead",
  name: "Headline + Subhead",
  category: "Business",
  tags: ["headline","subhead","card"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    { id: "shape-card", type: "shape", shape: "rect", x: 90, y: 980, w: 820, h: 380, fill: "rgba(255,255,255,0.90)", radius: 36, shadow: "medium" },
    { id: "text-h", type: "text", x: 140, y: 1040, w: 720, h: 170, text: "Build this tool", fontFamily: "system-ui", fontWeight: 950, fontSize: 84, lineHeight: 0.95, letterSpacing: -1, align: "left", color: "#111111" },
    { id: "text-s", type: "text", x: 140, y: 1220, w: 720, h: 110, text: "Templates • Brand kit • Batch export", fontFamily: "system-ui", fontWeight: 700, fontSize: 42, lineHeight: 1.1, letterSpacing: -0.2, align: "left", color: "rgba(17,17,17,0.75)" }
  ]
};
