import { OverlayTemplate } from "../schema";

export const workoutMotivation: OverlayTemplate = {
  id: "workout-motivation",
  name: "Workout Motivation",
  category: "Fitness",
  tags: ["fitness", "workout", "gym", "motivation", "athletic"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    // Dark overlay
    {
      id: "dark-overlay",
      type: "shape",
      shape: "rectangle",
      x: 0,
      y: 0,
      w: 1000,
      h: 1500,
      fill: "rgba(0,0,0,0.5)"
    },
    // Diagonal accent stripe
    {
      id: "stripe-1",
      type: "shape",
      shape: "rectangle",
      x: -200,
      y: 200,
      w: 1400,
      h: 30,
      fill: "#ef4444",
      rotation: -15
    },
    {
      id: "stripe-2",
      type: "shape",
      shape: "rectangle",
      x: -200,
      y: 1200,
      w: 1400,
      h: 30,
      fill: "#ef4444",
      rotation: -15
    },
    // Main motivational text
    {
      id: "motivation-1",
      type: "text",
      x: 80,
      y: 400,
      w: 840,
      h: 200,
      text: "NO PAIN",
      fontFamily: "system-ui",
      fontWeight: 900,
      fontSize: 100,
      lineHeight: 1,
      letterSpacing: 4,
      align: "center",
      color: "#ffffff",
      stroke: "#000000",
      strokeWidth: 4
    },
    {
      id: "motivation-2",
      type: "text",
      x: 80,
      y: 620,
      w: 840,
      h: 200,
      text: "NO GAIN",
      fontFamily: "system-ui",
      fontWeight: 900,
      fontSize: 100,
      lineHeight: 1,
      letterSpacing: 4,
      align: "center",
      color: "#ef4444",
      stroke: "#000000",
      strokeWidth: 4
    },
    // Bottom card with workout info
    {
      id: "workout-card",
      type: "shape",
      shape: "rectangle",
      x: 100,
      y: 1000,
      w: 800,
      h: 300,
      fill: "rgba(255,255,255,0.15)",
      radius: 20,
      blur: 10
    },
    // Workout type
    {
      id: "workout-type",
      type: "text",
      x: 140,
      y: 1040,
      w: 720,
      h: 80,
      text: "FULL BODY",
      fontFamily: "system-ui",
      fontWeight: 900,
      fontSize: 56,
      lineHeight: 1,
      letterSpacing: 3,
      align: "center",
      color: "#ffffff"
    },
    // Duration
    {
      id: "duration",
      type: "text",
      x: 140,
      y: 1140,
      w: 720,
      h: 60,
      text: "45 MIN WORKOUT",
      fontFamily: "system-ui",
      fontWeight: 700,
      fontSize: 32,
      lineHeight: 1,
      letterSpacing: 2,
      align: "center",
      color: "rgba(255,255,255,0.9)"
    },
    // CTA
    {
      id: "cta",
      type: "text",
      x: 140,
      y: 1220,
      w: 720,
      h: 50,
      text: "LET'S GO! 💪",
      fontFamily: "system-ui",
      fontWeight: 700,
      fontSize: 28,
      lineHeight: 1,
      letterSpacing: 2,
      align: "center",
      color: "#fbbf24"
    }
  ]
};
