"use client";

import { create } from "zustand";
import { BrandKit, EditorState, OverlayLayer } from "./types";

type Actions = {
  init: (state: EditorState) => void;
  selectLayer: (id: string | null) => void;
  updateLayer: (id: string, patch: Partial<OverlayLayer>) => void;
  setCurrentIndex: (idx: number) => void;
  setBrand: (patch: Partial<BrandKit>) => void;
  applyBrandToAll: () => void;
  applyBrandToSelected: () => void;
};

const empty: EditorState = {
  projectId: "",
  templateId: "",
  canvas: { width: 1000, height: 1500 },
  images: [],
  currentIndex: 0,
  layers: [],
  selectedLayerId: null,
  brand: { fontFamily: "system-ui", primaryText: "#111111", accent: "#111111", shapeFill: "rgba(255,255,255,0.90)" }
};

export const useEditorStore = create<EditorState & Actions>((set, get) => ({
  ...empty,
  init: (state) => set(() => ({ ...state })),
  selectLayer: (id) => set(() => ({ selectedLayerId: id })),
  updateLayer: (id, patch) =>
    set((s) => ({ layers: s.layers.map((l) => (l.id === id ? ({ ...l, ...patch } as any) : l)) })),
  setCurrentIndex: (idx) => set((s) => ({ currentIndex: Math.max(0, Math.min(idx, s.images.length - 1)) })),
  setBrand: (patch) => set((s) => ({ brand: { ...s.brand, ...patch } })),
  applyBrandToAll: () => {
    const b = get().brand;
    set((s) => ({
      layers: s.layers.map((l) => {
        if (l.type === "text") {
          const tl: any = l;
          return { ...tl, fontFamily: b.fontFamily, color: b.primaryText };
        }
        // for shapes: only update those that look like "overlay backgrounds" (semi-transparent whites) by default
        const sl: any = l;
        return { ...sl, fill: b.shapeFill };
      })
    }));
  },
  applyBrandToSelected: () => {
    const b = get().brand;
    const id = get().selectedLayerId;
    if (!id) return;
    set((s) => ({
      layers: s.layers.map((l) => {
        if (l.id !== id) return l;
        if (l.type === "text") return ({ ...(l as any), fontFamily: b.fontFamily, color: b.primaryText } as any);
        return ({ ...(l as any), fill: b.shapeFill } as any);
      })
    }));
  }
}));
