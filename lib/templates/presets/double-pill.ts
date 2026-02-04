import { OverlayTemplate } from "../schema";
export const doublePill: OverlayTemplate = {
  id: "double-pill",
  name: "Double Pill",
  category: "Business",
  tags: ["pill","cta","headline"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    { id: "shape-pill-1", type: "shape", shape: "pill", x: 120, y: 980, w: 760, h: 170, fill: "rgba(255,255,255,0.92)", radius: 999, shadow: "soft" },
    { id: "shape-pill-2", type: "shape", shape: "pill", x: 180, y: 1180, w: 640, h: 150, fill: "rgba(0,0,0,0.55)", radius: 999, shadow: "none" },
    { id: "text-pill-1", type: "text", x: 160, y: 1015, w: 680, h: 120, text: "Affiliate niche ideas", fontFamily: "system-ui", fontWeight: 900, fontSize: 58, lineHeight: 1.0, letterSpacing: -0.5, align: "center", color: "#111111" },
    { id: "text-pill-2", type: "text", x: 210, y: 1208, w: 580, h: 110, text: "that actually convert", fontFamily: "system-ui", fontWeight: 800, fontSize: 46, lineHeight: 1.0, letterSpacing: -0.2, align: "center", color: "#ffffff" }
  ]
};
