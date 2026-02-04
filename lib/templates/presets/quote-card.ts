import { OverlayTemplate } from "../schema";

export const quoteCard: OverlayTemplate = {
  id: "quote-card",
  name: "Quote Card",
  category: "Inspiration",
  tags: ["quote", "inspiration", "elegant", "serif", "testimonial"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    // Soft background overlay
    {
      id: "bg-overlay",
      type: "shape",
      shape: "rect",
      x: 0,
      y: 0,
      w: 1000,
      h: 1500,
      fill: "rgba(0,0,0,0.4)"
    },
    // Opening quote mark
    {
      id: "quote-open",
      type: "text",
      x: 80,
      y: 400,
      w: 200,
      h: 200,
      text: '"',
      fontFamily: "Georgia, serif",
      fontWeight: 700,
      fontSize: 200,
      lineHeight: 1,
      letterSpacing: 0,
      align: "left",
      color: "#fbbf24",
      opacity: 0.8
    },
    // Main quote text
    {
      id: "quote-text",
      type: "text",
      x: 120,
      y: 550,
      w: 760,
      h: 400,
      text: "The only way to do\ngreat work is to love\nwhat you do.",
      fontFamily: "Georgia, serif",
      fontWeight: 400,
      fontSize: 56,
      lineHeight: 1.4,
      letterSpacing: 0,
      align: "center",
      color: "#ffffff"
    },
    // Author attribution line
    {
      id: "divider",
      type: "shape",
      shape: "rect",
      x: 400,
      y: 980,
      w: 200,
      h: 2,
      fill: "#fbbf24"
    },
    // Author name
    {
      id: "author",
      type: "text",
      x: 200,
      y: 1010,
      w: 600,
      h: 80,
      text: "Steve Jobs",
      fontFamily: "system-ui",
      fontWeight: 500,
      fontSize: 28,
      lineHeight: 1,
      letterSpacing: 2,
      align: "center",
      color: "rgba(255,255,255,0.9)"
    },
    // Closing quote mark
    {
      id: "quote-close",
      type: "text",
      x: 720,
      y: 900,
      w: 200,
      h: 200,
      text: '"',
      fontFamily: "Georgia, serif",
      fontWeight: 700,
      fontSize: 200,
      lineHeight: 1,
      letterSpacing: 0,
      align: "right",
      color: "#fbbf24",
      opacity: 0.8
    }
  ]
};
