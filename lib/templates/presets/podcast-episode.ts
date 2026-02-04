import { OverlayTemplate } from "../schema";

export const podcastEpisode: OverlayTemplate = {
  id: "podcast-episode",
  name: "Podcast Episode",
  category: "Media",
  tags: ["podcast", "audio", "episode", "show", "interview"],
  canvas: { width: 1000, height: 1500 },
  layers: [
    // Background gradient
    {
      id: "bg-gradient",
      type: "shape",
      shape: "rect",
      x: 0,
      y: 0,
      w: 1000,
      h: 1500,
      fill: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    // "PODCAST" label
    {
      id: "podcast-label",
      type: "text",
      x: 100,
      y: 150,
      w: 800,
      h: 60,
      text: "PODCAST",
      fontFamily: "system-ui",
      fontWeight: 900,
      fontSize: 32,
      lineHeight: 1,
      letterSpacing: 8,
      align: "center",
      color: "rgba(255,255,255,0.6)"
    },
    // Episode number circle
    {
      id: "ep-circle",
      type: "shape",
      shape: "circle",
      x: 400,
      y: 250,
      w: 200,
      h: 200,
      fill: "rgba(255,255,255,0.2)",
      blur: 5
    },
    {
      id: "ep-number",
      type: "text",
      x: 420,
      y: 300,
      w: 160,
      h: 100,
      text: "EP\n42",
      fontFamily: "system-ui",
      fontWeight: 900,
      fontSize: 52,
      lineHeight: 1.1,
      letterSpacing: 0,
      align: "center",
      color: "#ffffff"
    },
    // Episode title card
    {
      id: "title-card",
      type: "shape",
      shape: "rect",
      x: 80,
      y: 550,
      w: 840,
      h: 400,
      fill: "rgba(255,255,255,0.95)",
      radius: 24,
      shadow: "strong"
    },
    // Episode title
    {
      id: "episode-title",
      type: "text",
      x: 120,
      y: 600,
      w: 760,
      h: 240,
      text: "The Future of\nRemote Work",
      fontFamily: "system-ui",
      fontWeight: 900,
      fontSize: 64,
      lineHeight: 1.2,
      letterSpacing: -1,
      align: "center",
      color: "#1f2937"
    },
    // Guest info
    {
      id: "guest",
      type: "text",
      x: 120,
      y: 860,
      w: 760,
      h: 60,
      text: "with Sarah Johnson",
      fontFamily: "system-ui",
      fontWeight: 500,
      fontSize: 28,
      lineHeight: 1,
      letterSpacing: 0,
      align: "center",
      color: "#6b7280"
    },
    // Audio wave bars (decorative)
    {
      id: "wave-1",
      type: "shape",
      shape: "rect",
      x: 200,
      y: 1100,
      w: 20,
      h: 80,
      fill: "#ffffff",
      radius: 10,
      opacity: 0.6
    },
    {
      id: "wave-2",
      type: "shape",
      shape: "rect",
      x: 240,
      y: 1080,
      w: 20,
      h: 120,
      fill: "#ffffff",
      radius: 10,
      opacity: 0.8
    },
    {
      id: "wave-3",
      type: "shape",
      shape: "rect",
      x: 280,
      y: 1090,
      w: 20,
      h: 100,
      fill: "#ffffff",
      radius: 10,
      opacity: 0.7
    },
    {
      id: "wave-4",
      type: "shape",
      shape: "rect",
      x: 320,
      y: 1070,
      w: 20,
      h: 140,
      fill: "#ffffff",
      radius: 10,
      opacity: 0.9
    },
    {
      id: "wave-5",
      type: "shape",
      shape: "rect",
      x: 360,
      y: 1100,
      w: 20,
      h: 80,
      fill: "#ffffff",
      radius: 10,
      opacity: 0.6
    },
    // Duration badge
    {
      id: "duration-badge",
      type: "shape",
      shape: "rect",
      x: 450,
      y: 1100,
      w: 140,
      h: 60,
      fill: "rgba(255,255,255,0.2)",
      radius: 30
    },
    {
      id: "duration",
      type: "text",
      x: 450,
      y: 1110,
      w: 140,
      h: 40,
      text: "52 MIN",
      fontFamily: "system-ui",
      fontWeight: 700,
      fontSize: 24,
      lineHeight: 1,
      letterSpacing: 1,
      align: "center",
      color: "#ffffff"
    }
  ]
};
