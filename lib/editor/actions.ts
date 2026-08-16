import { OverlayTemplate } from "@/lib/templates/schema";
import { EditorState, OverlayLayer } from "./types";

export function cloneLayers(layers: OverlayLayer[]): OverlayLayer[] {
  return structuredClone(layers);
}

export function createProjectStateFromTemplate(
  projectId: string,
  template: OverlayTemplate,
  imageSrcs: string[],
  saved?: { layers?: OverlayLayer[]; brand?: EditorState["brand"]; currentIndex?: number }
): EditorState {
  const layers = saved?.layers?.length ? cloneLayers(saved.layers) : cloneLayers(template.layers);
  const currentIndex = saved?.currentIndex ?? 0;
  return {
    projectId,
    templateId: template.id,
    canvas: { ...template.canvas },
    images: imageSrcs.map((src, idx) => ({ id: String(idx + 1), src })),
    currentIndex: Math.max(0, Math.min(currentIndex, Math.max(imageSrcs.length - 1, 0))),
    layers,
    selectedLayerId: null,
    brand: saved?.brand
      ? structuredClone(saved.brand)
      : {
          fontFamily: "system-ui",
          primaryText: "#111111",
          accent: "#111111",
          shapeFill: "rgba(255,255,255,0.90)",
        },
  };
}
