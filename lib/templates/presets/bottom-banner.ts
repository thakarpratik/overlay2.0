import { OverlayTemplate } from "../schema";
export const bottomBanner: OverlayTemplate = {
  id: "bottom-banner",
  name: "Bottom Banner",
  category: "Food",
  tags: ["recipe","banner","bottom"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    { id: "shape-banner", type: "shape", shape: "rect", x: 90, y: 1080, w: 820, h: 240, fill: "rgba(255,255,255,0.92)", radius: 28, shadow: "soft" },
    { id: "text-banner", type: "text", x: 130, y: 1120, w: 740, h: 170, text: "Ginger Chicken\nNoodle Soup", fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 64, lineHeight: 1.0, letterSpacing: -0.2, align: "center", color: "#111111" }
  ]
};
