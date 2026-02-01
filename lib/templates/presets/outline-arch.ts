import { OverlayTemplate } from "../schema";
export const outlineArch: OverlayTemplate = {
  id: "outline-arch",
  name: "Outline Arch",
  category: "Home",
  tags: ["arch","outline","soft"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    { id: "shape-arch", type: "shape", shape: "arch", x: 140, y: 220, w: 720, h: 960, fill: "rgba(255,255,255,0.0)", radius: 999, shadow: "none", border: { color: "rgba(255,255,255,0.95)", width: 10 } },
    { id: "shape-fill", type: "shape", shape: "arch", x: 155, y: 235, w: 690, h: 930, fill: "rgba(255,255,255,0.65)", radius: 999, shadow: "soft" },
    { id: "text-title", type: "text", x: 230, y: 380, w: 540, h: 560, text: "Minimal\nScandi\nVibes", fontFamily: "system-ui", fontWeight: 900, fontSize: 86, lineHeight: 0.94, letterSpacing: -1, align: "center", color: "#111111" }
  ]
};
