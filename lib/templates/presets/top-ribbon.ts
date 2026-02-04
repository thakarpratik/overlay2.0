import { OverlayTemplate } from "../schema";
export const topRibbon: OverlayTemplate = {
  id: "top-ribbon",
  name: "Top Ribbon",
  category: "Quotes",
  tags: ["ribbon","top","quote"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    { id: "shape-ribbon", type: "shape", shape: "rect", x: 90, y: 90, w: 820, h: 210, fill: "rgba(0,0,0,0.55)", radius: 24, shadow: "none" },
    { id: "text-ribbon", type: "text", x: 130, y: 120, w: 740, h: 150, text: "Daily motivation\nthat actually hits.", fontFamily: "system-ui", fontWeight: 800, fontSize: 54, lineHeight: 1.0, letterSpacing: -0.5, align: "center", color: "#ffffff", textShadow: "0 6px 16px rgba(0,0,0,.35)" }
  ]
};
