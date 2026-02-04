import { OverlayTemplate } from "../schema";

export const productSpotlight: OverlayTemplate = {
  id: "product-spotlight",
  name: "Product Spotlight",
  category: "E-commerce",
  tags: ["product", "shopping", "sale", "ecommerce", "launch"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    // Dark gradient background
    {
      id: "bg-gradient",
      type: "shape",
      shape: "rect",
      x: 0,
      y: 0,
      w: 1000,
      h: 1500,
      fill: "rgba(0,0,0,0.8)",
      radius: 0
    },
    // Spotlight circle (glow effect)
    {
      id: "spotlight",
      type: "shape",
      shape: "circle",
      x: 200,
      y: 400,
      w: 600,
      h: 600,
      fill: "rgba(255,255,255,0.1)",
      radius: 300,
      opacity: 0.5
    },
    // "NEW" badge
    {
      id: "new-badge",
      type: "shape",
      shape: "pill",
      x: 80,
      y: 150,
      w: 180,
      h: 60,
      fill: "#ef4444",
      radius: 30
    },
    {
      id: "new-text",
      type: "text",
      x: 80,
      y: 160,
      w: 180,
      h: 40,
      text: "NEW",
      fontFamily: "system-ui",
      fontWeight: 900,
      fontSize: 28,
      lineHeight: 1,
      letterSpacing: 3,
      align: "center",
      color: "#ffffff"
    },
    // Product name
    {
      id: "product-name",
      type: "text",
      x: 100,
      y: 1050,
      w: 800,
      h: 120,
      text: "ULTRA PRO\nHEADPHONES",
      fontFamily: "system-ui",
      fontWeight: 900,
      fontSize: 56,
      lineHeight: 1.1,
      letterSpacing: 2,
      align: "center",
      color: "#ffffff"
    },
    // Price
    {
      id: "price",
      type: "text",
      x: 300,
      y: 1200,
      w: 400,
      h: 80,
      text: "$299",
      fontFamily: "system-ui",
      fontWeight: 700,
      fontSize: 72,
      lineHeight: 1,
      letterSpacing: 0,
      align: "center",
      color: "#fbbf24"
    },
    // CTA background
    {
      id: "cta-bg",
      type: "shape",
      shape: "pill",
      x: 350,
      y: 1320,
      w: 300,
      h: 70,
      fill: "#ffffff",
      radius: 35
    },
    {
      id: "cta-text",
      type: "text",
      x: 350,
      y: 1330,
      w: 300,
      h: 50,
      text: "SHOP NOW",
      fontFamily: "system-ui",
      fontWeight: 700,
      fontSize: 24,
      lineHeight: 1,
      letterSpacing: 2,
      align: "center",
      color: "#000000"
    }
  ]
};
