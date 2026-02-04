import { OverlayTemplate } from "../schema";

export const travelDestination: OverlayTemplate = {
  id: "travel-destination",
  name: "Travel Destination",
  category: "Travel",
  tags: ["travel", "destination", "adventure", "wanderlust", "vacation"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    // Gradient overlay
    {
      id: "gradient",
      type: "shape",
      shape: "rect",
      x: 0,
      y: 0,
      w: 1000,
      h: 1500,
      fill: "rgba(0,0,0,0.5)",
      radius: 0
    },
    // Location pin icon
    {
      id: "pin-icon",
      type: "text",
      x: 450,
      y: 250,
      w: 100,
      h: 100,
      text: "📍",
      fontFamily: "system-ui",
      fontWeight: 400,
      fontSize: 72,
      lineHeight: 1,
      letterSpacing: 0,
      align: "center",
      color: "#ef4444"
    },
    // Destination name
    {
      id: "destination",
      type: "text",
      x: 80,
      y: 380,
      w: 840,
      h: 200,
      text: "SANTORINI",
      fontFamily: "system-ui",
      fontWeight: 900,
      fontSize: 100,
      lineHeight: 1,
      letterSpacing: 4,
      align: "center",
      color: "#ffffff",
      stroke: { color: "rgba(0,0,0,0.3)", width: 3 }
    },
    // Country
    {
      id: "country",
      type: "text",
      x: 200,
      y: 600,
      w: 600,
      h: 70,
      text: "Greece",
      fontFamily: "system-ui",
      fontWeight: 400,
      fontSize: 42,
      lineHeight: 1,
      letterSpacing: 2,
      align: "center",
      color: "rgba(255,255,255,0.9)"
    },
    // Info card
    {
      id: "info-card",
      type: "shape",
      shape: "rect",
      x: 120,
      y: 900,
      w: 760,
      h: 400,
      fill: "rgba(255,255,255,0.95)",
      radius: 24,
      shadow: "medium"
    },
    // "Must Visit" badge
    {
      id: "badge",
      type: "shape",
      shape: "pill",
      x: 350,
      y: 870,
      w: 300,
      h: 60,
      fill: "#10b981",
      radius: 30
    },
    {
      id: "badge-text",
      type: "text",
      x: 350,
      y: 880,
      w: 300,
      h: 40,
      text: "MUST VISIT",
      fontFamily: "system-ui",
      fontWeight: 900,
      fontSize: 22,
      lineHeight: 1,
      letterSpacing: 3,
      align: "center",
      color: "#ffffff"
    },
    // Description
    {
      id: "description",
      type: "text",
      x: 160,
      y: 980,
      w: 680,
      h: 200,
      text: "Stunning white buildings,\nblue-domed churches,\nand breathtaking sunsets",
      fontFamily: "system-ui",
      fontWeight: 400,
      fontSize: 32,
      lineHeight: 1.5,
      letterSpacing: 0,
      align: "center",
      color: "#1f2937"
    },
    // Best time label
    {
      id: "best-time",
      type: "text",
      x: 160,
      y: 1200,
      w: 680,
      h: 60,
      text: "Best Time: April - October",
      fontFamily: "system-ui",
      fontWeight: 600,
      fontSize: 24,
      lineHeight: 1,
      letterSpacing: 0,
      align: "center",
      color: "#6366f1"
    }
  ]
};
