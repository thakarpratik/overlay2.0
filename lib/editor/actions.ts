import { OverlayTemplate } from "@/lib/templates/schema";
import { EditorState } from "./types";

export function createProjectStateFromTemplate(projectId: string, template: OverlayTemplate, imageSrcs: string[]): EditorState {
  return {
    projectId,
    templateId: template.id,
    canvas: { ...template.canvas },
    images: imageSrcs.map((src, idx) => ({ id: String(idx + 1), src })),
    currentIndex: 0,
    layers: template.layers.map((l) => ({ ...l })) as any,
    selectedLayerId: null,
    brand: {
      fontFamily: "system-ui",
      primaryText: "#111111",
      accent: "#111111",
      shapeFill: "rgba(255,255,255,0.90)"
    }
  };
}
