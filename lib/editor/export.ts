"use client";

import JSZip from "jszip";
import { toBlob } from "html-to-image";
import { saveAs } from "file-saver";
import { useEditorStore } from "./store";

type ExportOpts = { filename?: string; pixelRatio?: number; backgroundColor?: string };

function getStageEl(): HTMLElement {
  const el = document.querySelector("[data-export-stage]") as HTMLElement | null;
  if (!el) throw new Error("Export stage not found.");
  return el;
}

function getCanvasDims(stage: HTMLElement) {
  const cw = Number(stage.getAttribute("data-cw") || "1000");
  const ch = Number(stage.getAttribute("data-ch") || "1500");
  return { cw, ch };
}

async function waitForPaint(ms = 120) {
  await new Promise((r) => requestAnimationFrame(() => r(null)));
  await new Promise((r) => requestAnimationFrame(() => r(null)));
  if (ms > 0) await new Promise((r) => setTimeout(r, ms));
}

export async function waitForCurrentIndex(idx: number, timeoutMs = 4000) {
  if (useEditorStore.getState().currentIndex === idx) return;
  await new Promise<void>((resolve, reject) => {
    const timer = window.setTimeout(() => {
      unsub();
      reject(new Error("Timed out waiting for canvas image."));
    }, timeoutMs);
    const unsub = useEditorStore.subscribe((s) => {
      if (s.currentIndex === idx) {
        window.clearTimeout(timer);
        unsub();
        resolve();
      }
    });
  });
}

async function captureStage(opts: ExportOpts) {
  const stage = getStageEl();
  const { cw, ch } = getCanvasDims(stage);
  const blob = await toBlob(stage, {
    pixelRatio: opts.pixelRatio ?? 1,
    cacheBust: true,
    backgroundColor: opts.backgroundColor ?? undefined,
    width: cw,
    height: ch,
    style: { transform: "none", width: `${cw}px`, height: `${ch}px` }
  });
  if (!blob) throw new Error("toBlob() returned null (CORS/taint).");
  return blob;
}

export async function exportCurrentAsPng(opts: ExportOpts = {}) {
  const prev = useEditorStore.getState().selectedLayerId;
  useEditorStore.getState().selectLayer(null);
  try {
    await waitForPaint(140);
    const blob = await captureStage(opts);
    saveAs(blob, opts.filename ?? `overlay-${Date.now()}.png`);
  } catch (err) {
    console.error("Export PNG failed:", err);
    alert("Export failed. Open DevTools Console to see the error.");
  } finally {
    useEditorStore.getState().selectLayer(prev);
  }
}

export async function exportAllAsZip(
  getItems: () => { name: string; beforeCapture?: () => Promise<void> }[],
  opts: ExportOpts = {}
) {
  const prev = useEditorStore.getState().selectedLayerId;
  const prevIndex = useEditorStore.getState().currentIndex;
  useEditorStore.getState().selectLayer(null);
  try {
    const zip = new JSZip();

    for (const item of getItems()) {
      if (item.beforeCapture) await item.beforeCapture();
      await waitForPaint(160);
      const blob = await captureStage(opts);
      zip.file(item.name, blob);
    }

    const out = await zip.generateAsync({ type: "blob" });
    saveAs(out, `exports-${Date.now()}.zip`);
  } catch (err) {
    console.error("Export ZIP failed:", err);
    alert("ZIP export failed. Open DevTools Console to see the error.");
  } finally {
    useEditorStore.getState().setCurrentIndex(prevIndex);
    useEditorStore.getState().selectLayer(prev);
  }
}
