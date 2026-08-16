import { BrandKit, OverlayLayer } from "./types";

export type StoredProject = {
  id: string;
  templateId: string;
  imageKeys: string[];
  createdAt: number;
  layers?: OverlayLayer[];
  brand?: BrandKit;
  currentIndex?: number;
};

function key(projectId: string) {
  return `project:${projectId}`;
}

export function loadStoredProject(projectId: string): StoredProject | null {
  const raw = localStorage.getItem(key(projectId));
  if (!raw) return null;
  const data = JSON.parse(raw) as StoredProject;
  if (!data?.id || !Array.isArray(data.imageKeys)) {
    throw new Error("Invalid project record");
  }
  return data;
}

export function saveStoredProject(data: StoredProject) {
  localStorage.setItem(key(data.id), JSON.stringify(data));
}

export function patchStoredProject(projectId: string, patch: Partial<StoredProject>) {
  const current = loadStoredProject(projectId);
  if (!current) return;
  saveStoredProject({ ...current, ...patch, id: projectId });
}
