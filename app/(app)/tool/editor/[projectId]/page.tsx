"use client";

import { useEffect, useState } from "react";
import EditorShell from "@/components/editor/EditorShell";
import { getTemplateById } from "@/lib/templates";
import { createProjectStateFromTemplate } from "@/lib/editor/actions";
import { useEditorStore } from "@/lib/editor/store";
import { getImage } from "@/lib/storage/images";

export default function EditorPage({ params }: { params: { projectId: string } }) {
  const projectId = params.projectId;
  const [ready, setReady] = useState(false);
  const init = useEditorStore((s) => s.init);

  useEffect(() => {
    let urls: string[] = [];

    const load = async () => {
      const raw = localStorage.getItem(`project:${projectId}`);
      if (!raw) return;

      const data = JSON.parse(raw) as { id: string; templateId: string; imageKeys: string[] };
      const template = getTemplateById(data.templateId);

      const imageSrcs: string[] = [];
      for (const key of data.imageKeys) {
        const blob = await getImage(key);
        if (blob) {
          const url = URL.createObjectURL(blob);
          urls.push(url);
          imageSrcs.push(url);
        }
      }

      const initial = createProjectStateFromTemplate(projectId, template, imageSrcs);
      init(initial);
      setReady(true);
    };

    load();

    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
      urls = [];
    };
  }, [projectId, init]);

  /* ── loading state ── */
  if (!ready) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-12">
        <div className="rounded-2xl p-10 flex flex-col items-center justify-center text-center"
          style={{ background: 'rgba(30,32,42,0.45)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)', minHeight: '360px' }}>

          {/* animated spinner ring */}
          <div className="relative w-14 h-14 mb-5">
            <svg className="w-full h-full animate-spin" style={{ animationDuration: '1s' }} viewBox="0 0 50 50">
              <circle cx="25" cy="25" r="20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
              <circle cx="25" cy="25" r="20" fill="none" stroke="#6366f1" strokeWidth="4"
                strokeLinecap="round" strokeDasharray="60 80" strokeDashoffset="0" />
            </svg>
            {/* center logo mark */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold text-white"
                style={{ background: 'linear-gradient(135deg,#6366f1,#4f46e5)' }}>O</span>
            </div>
          </div>

          <h2 className="text-white font-semibold text-base" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Loading project
          </h2>
          <p className="mt-1.5 text-sm" style={{ color: '#6b7280' }}>
            Pulling your images from IndexedDB…
          </p>
        </div>
      </div>
    );
  }

  return <EditorShell />;
}
