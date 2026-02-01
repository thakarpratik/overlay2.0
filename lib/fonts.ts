export type FontOption = { id: string; name: string; css: string };

export const FONT_OPTIONS: FontOption[] = [
  { id: "system", name: "System (Clean)", css: "system-ui, -apple-system, Segoe UI, Roboto, Arial" },
  { id: "modern", name: "Modern (Sans)", css: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial" },
  { id: "elegant", name: "Elegant (Serif)", css: "Georgia, Cambria, 'Times New Roman', Times, serif" },
  { id: "bold", name: "Bold (Display)", css: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial" },
  { id: "mono", name: "Mono (Tech)", css: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace" }
];
