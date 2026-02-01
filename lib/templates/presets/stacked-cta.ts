import { OverlayTemplate } from "../schema";
export const stackedCta: OverlayTemplate = {
  id: "stacked-cta",
  name: "Stacked CTA",
  category: "Business",
  tags: ["cta","stacked","dark"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    { id: "shape", type: "shape", shape: "rect", x: 90, y: 1010, w: 820, h: 330, fill: "rgba(0,0,0,0.55)", radius: 36, shadow: "none" },
    { id: "text", type: "text", x: 140, y: 1070, w: 720, h: 220, text: "Steal these\ncontent ideas", fontFamily: "system-ui", fontWeight: 950, fontSize: 86, lineHeight: 0.92, letterSpacing: -1, align: "left", color: "#ffffff", textShadow: "0 10px 22px rgba(0,0,0,.35)" }
  ]
};
