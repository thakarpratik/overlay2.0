import { OverlayTemplate } from "../schema";
export const scandiArch: OverlayTemplate = {
  id: "scandi-arch",
  name: "Scandi Arch Title",
  category: "Home",
  tags: ["arch","minimal","scandi"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    { id: "shape-arch", type: "shape", shape: "arch", x: 150, y: 210, w: 700, h: 920, fill: "rgba(255,255,255,0.92)", radius: 999, shadow: "soft" },
    { id: "text-title", type: "text", x: 210, y: 350, w: 580, h: 620, text: "33\nScandi\nBoho\ndecor\nideas", fontFamily: "system-ui", fontWeight: 900, fontSize: 84, lineHeight: 0.95, letterSpacing: -1, align: "center", color: "#111111" }
  ]
};
