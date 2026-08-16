"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import EditorShell from "@/components/editor/EditorShell";
import { getTemplateById, templates } from "@/lib/templates";
import { createProjectStateFromTemplate } from "@/lib/editor/actions";
import { useEditorStore } from "@/lib/editor/store";
import { getImage } from "@/lib/storage/images";
import { loadStoredProject, patchStoredProject } from "@/lib/editor/persist";

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
  const templateIdParam = searchParams.get("templateId");

  const [ready, setReady] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const loadGen = useRef(0);

  const init = useEditorStore((s) => s.init);

  const load = useCallback(async () => {
    const gen = ++loadGen.current;
    setReady(false);
    setLoadError(null);
    try {
      const data = loadStoredProject(projectId);
      if (!data) {
        if (gen === loadGen.current) setLoadError("Project not found");
        return;
      }

      const requestedId = templateIdParam ?? data.templateId;
      const template = getTemplateById(requestedId);
      if (!template) {
        if (gen === loadGen.current) setLoadError("That template is no longer available.");
        return;
      }

      const switchingTemplate = requestedId !== data.templateId;
      if (switchingTemplate) {
        patchStoredProject(projectId, { templateId: template.id, layers: undefined });
      }

      // Data URLs stay valid after blob URLs are revoked, which html-to-image needs during export.
      const imageSrcs: string[] = [];
      for (const key of data.imageKeys) {
        try {
          const blob = await getImage(key);
          if (blob) imageSrcs.push(await blobToDataUrl(blob));
        } catch {
          // skip missing/unreadable blobs
        }
      }

      if (gen !== loadGen.current) return;

      const initial = createProjectStateFromTemplate(
        projectId,
        template,
        imageSrcs,
        switchingTemplate
          ? undefined
          : { layers: data.layers, brand: data.brand, currentIndex: data.currentIndex }
      );
      init(initial);
      setReady(true);
    } catch (err) {
      console.error("Failed to load project:", err);
      if (gen === loadGen.current) setLoadError("Could not load project");
    }
  }, [projectId, templateIdParam, init]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (!ready) return;
    let timer: number;
    const persist = () => {
      const s = useEditorStore.getState();
      if (!s.projectId) return;
      patchStoredProject(s.projectId, {
        layers: s.layers,
        brand: s.brand,
        currentIndex: s.currentIndex,
        templateId: s.templateId,
      });
    };
    const unsub = useEditorStore.subscribe(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(persist, 300);
    });
    persist();
    return () => {
      unsub();
      window.clearTimeout(timer);
      persist();
    };
  }, [ready]);

  const switchTemplate = (templateId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("templateId", templateId);
    router.push(`${pathname}?${params.toString()}`);
    setDrawerOpen(false);
  };

  if (loadError) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-12">
        <div className="rounded-2xl p-10 flex flex-col items-center justify-center text-center"
          style={{ background: 'rgba(30,32,42,0.45)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)', minHeight: '360px' }}>
          <h2 className="text-white font-semibold text-base" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{loadError}</h2>
          <p className="mt-1.5 text-sm" style={{ color: '#6b7280' }}>Start a new project or go back to the tool.</p>
          <div className="mt-6 flex gap-3">
            <Link href="/tool/new" className="rounded-full px-4 py-2 text-sm font-semibold text-white" style={{ background: 'linear-gradient(135deg,#6366f1,#4f46e5)' }}>
              New project
            </Link>
            <Link href="/tool" className="rounded-full px-4 py-2 text-sm" style={{ color: '#d1d5db', border: '1px solid rgba(255,255,255,0.12)' }}>
              Back
            </Link>
          </div>
        </div>
      </div>
    );
  }

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

  return (
    <div className="relative">
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

      <EditorShell />

      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(3px)' }} onClick={() => setDrawerOpen(false)} />

          <div className="relative w-full max-w-md h-full overflow-y-auto"
            style={{ background: '#1a1c24', borderLeft: '1px solid rgba(255,255,255,0.07)' }}>

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
