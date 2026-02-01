import { OverlayTemplate } from "../schema";
export const softArchBottom: OverlayTemplate = {
  id: "soft-arch-bottom",
  name: "Soft Arch Bottom",
  category: "Home",
  tags: ["arch","bottom","soft"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    { id: "shape-arch", type: "shape", shape: "arch", x: 120, y: 760, w: 760, h: 640, fill: "rgba(255,255,255,0.88)", radius: 999, shadow: "medium" },
    { id: "text", type: "text", x: 200, y: 860, w: 600, h: 420, text: "Warm\n&\nMinimal", fontFamily: "system-ui", fontWeight: 950, fontSize: 92, lineHeight: 0.9, letterSpacing: -1, align: "center", color: "#111111" }
  ]
};
