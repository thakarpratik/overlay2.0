"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import EditorShell from "@/components/editor/EditorShell";
import { getTemplateById, templates } from "@/lib/templates";
import { createProjectStateFromTemplate } from "@/lib/editor/actions";
import { useEditorStore } from "@/lib/editor/store";
import { getImage } from "@/lib/storage/images";

/* convert a Blob → a stable data: URL that can never be revoked */
function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export default function EditorPage({ params }: { params: { projectId: string } }) {
  const projectId = params.projectId;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [ready, setReady] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const init = useEditorStore((s) => s.init);

  /* ── load / reload project whenever templateId param changes ── */
  const load = useCallback(async () => {
    setReady(false);
    try {
      const raw = localStorage.getItem(`project:${projectId}`);
      if (!raw) return;

      const data = JSON.parse(raw) as { id: string; templateId: string; imageKeys: string[] };

      /* prefer ?templateId from URL, fall back to stored value */
      const templateId = searchParams.get("templateId") ?? data.templateId;
      const template = getTemplateById(templateId);

      /* persist the chosen template back so refresh keeps it */
      if (templateId !== data.templateId) {
        localStorage.setItem(`project:${projectId}`, JSON.stringify({ ...data, templateId }));
      }

      /* read each image from IndexedDB and convert to a data: URL.
         Data URLs are stable strings — they can't be revoked, so
         html-to-image can re-fetch them during export without errors. */
      const imageSrcs: string[] = [];
      for (const key of data.imageKeys) {
        const blob = await getImage(key);
        if (blob) {
          const dataUrl = await blobToDataUrl(blob);
          imageSrcs.push(dataUrl);
        }
      }

      const initial = createProjectStateFromTemplate(projectId, template, imageSrcs);
      init(initial);
      setReady(true);
    } catch (err) {
      console.error("Failed to load project:", err);
    }
  }, [projectId, searchParams, init]);

  useEffect(() => { load(); }, [load]);

  /* ── switch template: update URL param → triggers reload via searchParams dep ── */
  const switchTemplate = (templateId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("templateId", templateId);
    router.push(`${pathname}?${params.toString()}`);
    setDrawerOpen(false);
  };

  /* ── loading screen ── */
  if (!ready) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-12">
        <div className="rounded-2xl p-10 flex flex-col items-center justify-center text-center"
          style={{ background: 'rgba(30,32,42,0.45)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)', minHeight: '360px' }}>
          <div className="relative w-14 h-14 mb-5">
            <svg className="w-full h-full animate-spin" style={{ animationDuration: '1s' }} viewBox="0 0 50 50">
              <circle cx="25" cy="25" r="20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
              <circle cx="25" cy="25" r="20" fill="none" stroke="#6366f1" strokeWidth="4" strokeLinecap="round" strokeDasharray="60 80" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold text-white"
                style={{ background: 'linear-gradient(135deg,#6366f1,#4f46e5)' }}>O</span>
            </div>
          </div>
          <h2 className="text-white font-semibold text-base" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Loading project</h2>
          <p className="mt-1.5 text-sm" style={{ color: '#6b7280' }}>Pulling your images from IndexedDB…</p>
        </div>
      </div>
    );
  }

  /* ── live: editor + template-switch drawer ── */
  return (
    <div className="relative">
      {/* ── "Change template" trigger button rendered above EditorShell ── */}
      <div className="mx-auto max-w-7xl px-5 pt-4">
        <button
          onClick={() => setDrawerOpen(true)}
          className="inline-flex items-center gap-2 rounded-full text-sm font-medium px-4 py-2 transition-all duration-200"
          style={{ background: 'rgba(30,32,42,0.6)', border: '1px solid rgba(255,255,255,0.1)', color: '#d1d5db', backdropFilter: 'blur(8px)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10" /><polyline points="23 20 23 14 17 14" />
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
          </svg>
          Switch template
        </button>
      </div>

      {/* ── EditorShell (your existing full editor) ── */}
      <EditorShell />

      {/* ── template-switch drawer (slide in from right) ── */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* backdrop */}
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(3px)' }} onClick={() => setDrawerOpen(false)} />

          {/* panel */}
          <div className="relative w-full max-w-md h-full overflow-y-auto"
            style={{ background: '#1a1c24', borderLeft: '1px solid rgba(255,255,255,0.07)' }}>

            {/* header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4"
              style={{ background: 'rgba(26,28,36,0.9)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div>
                <h3 className="text-sm font-semibold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Switch template</h3>
                <p className="text-xs mt-0.5" style={{ color: '#6b7280' }}>Your images stay — only the layout changes.</p>
              </div>
              <button onClick={() => setDrawerOpen(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                style={{ background: 'rgba(255,255,255,0.06)', color: '#9ca3af' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            {/* template grid */}
            <div className="p-4 grid grid-cols-2 gap-3">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => switchTemplate(t.id)}
                  className="group relative rounded-xl p-3 text-left transition-all duration-200"
                  style={{ background: 'rgba(40,42,55,0.6)', border: '1px solid rgba(255,255,255,0.07)' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(99,102,241,0.5)';
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(99,102,241,0.1)';
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 16px rgba(99,102,241,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.07)';
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(40,42,55,0.6)';
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
                  }}
                >
                  {/* arrow */}
                  <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round">
                      <path d="M2 6h8M7 3l3 3-3 3" />
                    </svg>
                  </div>
                  <div className="text-xs font-semibold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{t.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#6b7280' }}>{t.category}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
