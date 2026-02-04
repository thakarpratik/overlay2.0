import { OverlayTemplate } from "../schema";

export const testimonialCard: OverlayTemplate = {
  id: "testimonial-card",
  name: "Testimonial Card",
  category: "Social Proof",
  tags: ["testimonial", "review", "rating", "customer", "trust"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    // Background card
    {
      id: "card-bg",
      type: "shape",
      shape: "rect",
      x: 80,
      y: 250,
      w: 840,
      h: 1000,
      fill: "#ffffff",
      radius: 32,
      shadow: "medium"
    },
    // 5-star rating
    {
      id: "stars",
      type: "text",
      x: 200,
      y: 320,
      w: 600,
      h: 80,
      text: "⭐⭐⭐⭐⭐",
      fontFamily: "system-ui",
      fontWeight: 400,
      fontSize: 48,
      lineHeight: 1,
      letterSpacing: 8,
      align: "center",
      color: "#fbbf24"
    },
    // Quote text
    {
      id: "quote",
      type: "text",
      x: 140,
      y: 480,
      w: 720,
      h: 400,
      text: "This product completely\nchanged my life! I can't\nimagine going back to\nmy old routine.",
      fontFamily: "Georgia, serif",
      fontWeight: 400,
      fontSize: 42,
      lineHeight: 1.5,
      letterSpacing: 0,
      align: "center",
      color: "#1f2937"
    },
    // Customer photo placeholder circle
    {
      id: "photo-circle",
      type: "shape",
      shape: "circle",
      x: 400,
      y: 950,
      w: 200,
      h: 200,
      fill: "#e5e7eb",
      radius: 100,
      shadow: "soft"
    },
    {
      id: "photo-placeholder",
      type: "text",
      x: 400,
      y: 1010,
      w: 200,
      h: 80,
      text: "👤",
      fontFamily: "system-ui",
      fontWeight: 400,
      fontSize: 64,
      lineHeight: 1,
      letterSpacing: 0,
      align: "center",
      color: "#9ca3af"
    },
    // Customer name
    {
      id: "customer-name",
      type: "text",
      x: 200,
      y: 1180,
      w: 600,
      h: 60,
      text: "Jessica M.",
      fontFamily: "system-ui",
      fontWeight: 700,
      fontSize: 32,
      lineHeight: 1,
      letterSpacing: 0,
      align: "center",
      color: "#1f2937"
    },
    // Verified badge
    {
      id: "verified",
      type: "text",
      x: 350,
      y: 180,
      w: 300,
      h: 60,
      text: "✓ VERIFIED REVIEW",
      fontFamily: "system-ui",
      fontWeight: 700,
      fontSize: 20,
      lineHeight: 1,
      letterSpacing: 2,
      align: "center",
      color: "#10b981"
    }
  ]
};
