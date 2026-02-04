import { OverlayTemplate } from "../schema";

export const recipeCard: OverlayTemplate = {
  id: "recipe-card",
  name: "Recipe Card",
  category: "Food",
  tags: ["recipe", "food", "cooking", "kitchen", "ingredients"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    // Top colored section
    {
      id: "top-section",
      type: "shape",
      shape: "rect",
      x: 0,
      y: 0,
      w: 1000,
      h: 400,
      fill: "#f97316"
    },
    // Recipe name
    {
      id: "recipe-name",
      type: "text",
      x: 80,
      y: 120,
      w: 840,
      h: 200,
      text: "PERFECT\nPANCAKES",
      fontFamily: "system-ui",
      fontWeight: 900,
      fontSize: 80,
      lineHeight: 1.1,
      letterSpacing: -1,
      align: "center",
      color: "#ffffff"
    },
    // Time badge circle
    {
      id: "time-circle",
      type: "shape",
      shape: "circle",
      x: 400,
      y: 320,
      w: 200,
      h: 200,
      fill: "#ffffff",
      shadow: "medium"
    },
    {
      id: "time-text",
      type: "text",
      x: 420,
      y: 370,
      w: 160,
      h: 100,
      text: "20\nMIN",
      fontFamily: "system-ui",
      fontWeight: 900,
      fontSize: 42,
      lineHeight: 1.1,
      letterSpacing: 0,
      align: "center",
      color: "#f97316"
    },
    // White card for details
    {
      id: "details-card",
      type: "shape",
      shape: "rect",
      x: 80,
      y: 560,
      w: 840,
      h: 800,
      fill: "rgba(255,255,255,0.95)",
      radius: 24,
      shadow: "soft"
    },
    // "Ingredients" label
    {
      id: "ingredients-label",
      type: "text",
      x: 120,
      y: 600,
      w: 760,
      h: 60,
      text: "INGREDIENTS",
      fontFamily: "system-ui",
      fontWeight: 700,
      fontSize: 24,
      lineHeight: 1,
      letterSpacing: 3,
      align: "left",
      color: "#1f2937"
    },
    // Ingredient list
    {
      id: "ingredients",
      type: "text",
      x: 140,
      y: 680,
      w: 720,
      h: 400,
      text: "• 2 cups flour\n• 2 eggs\n• 1.5 cups milk\n• 2 tbsp sugar\n• 1 tsp vanilla",
      fontFamily: "system-ui",
      fontWeight: 400,
      fontSize: 28,
      lineHeight: 1.8,
      letterSpacing: 0,
      align: "left",
      color: "#4b5563"
    },
    // Difficulty badge
    {
      id: "difficulty",
      type: "text",
      x: 120,
      y: 1200,
      w: 200,
      h: 50,
      text: "⭐ EASY",
      fontFamily: "system-ui",
      fontWeight: 600,
      fontSize: 24,
      lineHeight: 1,
      letterSpacing: 1,
      align: "left",
      color: "#10b981"
    }
  ]
};
