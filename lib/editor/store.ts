"use client";

import { create } from "zustand";
import { applyBrandToLayer } from "./brand";
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
    set((s) => ({
      layers: s.layers.map((l) => {
        if (l.id !== id) return l;
        if (l.type === "text") return { ...l, ...patch, type: "text" };
        return { ...l, ...patch, type: "shape" };
      }),
    })),
  setCurrentIndex: (idx) => set((s) => ({ currentIndex: Math.max(0, Math.min(idx, Math.max(s.images.length - 1, 0))) })),
  setBrand: (patch) => set((s) => ({ brand: { ...s.brand, ...patch } })),
  applyBrandToAll: () => {
    const previous = get().brand;
    const b = previous;
    set((s) => ({
      layers: s.layers.map((l) => applyBrandToLayer(l, b, previous, "all")),
    }));
  },
  applyBrandToSelected: () => {
    const previous = get().brand;
    const id = get().selectedLayerId;
    if (!id) return;
    set((s) => ({
      layers: s.layers.map((l) => (l.id === id ? applyBrandToLayer(l, previous, previous, "selected") : l)),
    }));
  }
}));
