import { OverlayTemplate } from "../schema";

export const stepByStep: OverlayTemplate = {
  id: "step-by-step",
  name: "Step by Step",
  category: "Tutorial",
  tags: ["tutorial", "how-to", "steps", "education", "guide"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    // Header bar
    {
      id: "header-bar",
      type: "shape",
      shape: "rect",
      x: 0,
      y: 0,
      w: 1000,
      h: 200,
      fill: "#1f2937"
    },
    // Title
    {
      id: "title",
      type: "text",
      x: 60,
      y: 50,
      w: 880,
      h: 100,
      text: "HOW TO DO IT",
      fontFamily: "system-ui",
      fontWeight: 700,
      fontSize: 48,
      lineHeight: 1,
      letterSpacing: 3,
      align: "center",
      color: "#ffffff"
    },
    // Step 1 circle
    {
      id: "circle-1",
      type: "shape",
      shape: "circle",
      x: 80,
      y: 350,
      w: 120,
      h: 120,
      fill: "#6366f1"
    },
    {
      id: "step-1-num",
      type: "text",
      x: 80,
      y: 380,
      w: 120,
      h: 60,
      text: "1",
      fontFamily: "system-ui",
      fontWeight: 900,
      fontSize: 64,
      lineHeight: 1,
      letterSpacing: 0,
      align: "center",
      color: "#ffffff"
    },
    {
      id: "step-1-text",
      type: "text",
      x: 230,
      y: 370,
      w: 700,
      h: 80,
      text: "First, prepare your materials",
      fontFamily: "system-ui",
      fontWeight: 600,
      fontSize: 32,
      lineHeight: 1.2,
      letterSpacing: 0,
      align: "left",
      color: "#1f2937"
    },
    // Step 2 circle
    {
      id: "circle-2",
      type: "shape",
      shape: "circle",
      x: 80,
      y: 600,
      w: 120,
      h: 120,
      fill: "#ec4899"
    },
    {
      id: "step-2-num",
      type: "text",
      x: 80,
      y: 630,
      w: 120,
      h: 60,
      text: "2",
      fontFamily: "system-ui",
      fontWeight: 900,
      fontSize: 64,
      lineHeight: 1,
      letterSpacing: 0,
      align: "center",
      color: "#ffffff"
    },
    {
      id: "step-2-text",
      type: "text",
      x: 230,
      y: 620,
      w: 700,
      h: 80,
      text: "Follow the instructions carefully",
      fontFamily: "system-ui",
      fontWeight: 600,
      fontSize: 32,
      lineHeight: 1.2,
      letterSpacing: 0,
      align: "left",
      color: "#1f2937"
    },
    // Step 3 circle
    {
      id: "circle-3",
      type: "shape",
      shape: "circle",
      x: 80,
      y: 850,
      w: 120,
      h: 120,
      fill: "#10b981"
    },
    {
      id: "step-3-num",
      type: "text",
      x: 80,
      y: 880,
      w: 120,
      h: 60,
      text: "3",
      fontFamily: "system-ui",
      fontWeight: 900,
      fontSize: 64,
      lineHeight: 1,
      letterSpacing: 0,
      align: "center",
      color: "#ffffff"
    },
    {
      id: "step-3-text",
      type: "text",
      x: 230,
      y: 870,
      w: 700,
      h: 80,
      text: "Enjoy your finished result!",
      fontFamily: "system-ui",
      fontWeight: 600,
      fontSize: 32,
      lineHeight: 1.2,
      letterSpacing: 0,
      align: "left",
      color: "#1f2937"
    }
  ]
};
