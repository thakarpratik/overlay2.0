import { OverlayTemplate } from "../schema";

export const numberedList: OverlayTemplate = {
  id: "numbered-list",
  name: "Numbered List",
  category: "Pinterest",
  tags: ["number", "list", "pinterest", "bold"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    // Number
    {
      id: "number",
      type: "text",
      x: 360,
      y: 350,
      w: 280,
      h: 180,
      text: "14",
      fontFamily: "Impact, system-ui",
      fontWeight: 900,
      fontSize: 180,
      lineHeight: 1,
      letterSpacing: 0,
      align: "center",
      color: "#d4a574"
    },
    // First word (with stroke)
    {
      id: "word1",
      type: "text",
      x: 200,
      y: 530,
      w: 600,
      h: 120,
      text: "WARM",
      fontFamily: "Impact, system-ui",
      fontWeight: 900,
      fontSize: 100,
      lineHeight: 1,
      letterSpacing: 2,
      align: "center",
      color: "#8b5a5a",
      stroke: "#ffffff",
      strokeWidth: 6
    },
    // Second word
    {
      id: "word2",
      type: "text",
      x: 100,
      y: 650,
      w: 800,
      h: 80,
      text: "SCANDINAVIAN",
      fontFamily: "system-ui",
      fontWeight: 900,
      fontSize: 64,
      lineHeight: 1,
      letterSpacing: 1,
      align: "center",
      color: "#000000"
    },
    // Third word (with stroke)
    {
      id: "word3",
      type: "text",
      x: 200,
      y: 730,
      w: 600,
      h: 120,
      text: "DECOR",
      fontFamily: "Impact, system-ui",
      fontWeight: 900,
      fontSize: 100,
      lineHeight: 1,
      letterSpacing: 2,
      align: "center",
      color: "#8b5a5a",
      stroke: "#ffffff",
      strokeWidth: 6
    },
    // Fourth word
    {
      id: "word4",
      type: "text",
      x: 200,
      y: 850,
      w: 600,
      h: 100,
      text: "IDEAS!",
      fontFamily: "system-ui",
      fontWeight: 900,
      fontSize: 80,
      lineHeight: 1,
      letterSpacing: 1,
      align: "center",
      color: "#000000"
    }
  ]
};

