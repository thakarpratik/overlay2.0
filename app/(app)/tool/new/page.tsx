"use client";

import { useState } from "react";
import { templates } from "@/lib/templates";
import { useRouter } from "next/navigation";
import UploadDropzone from "@/components/editor/UploadDropzone";
import { saveImage } from "@/lib/storage/images";

export default function NewProjectPage() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  /* save images + project, then jump straight into editor with that template */
  const goToEditor = async (templateId: string) => {
    if (files.length === 0 || loading) return;
    setLoading(true);
    try {
      const id = crypto.randomUUID();
      const imageKeys: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const key = `${id}:img:${i}`;
        await saveImage(key, files[i]);
        imageKeys.push(key);
      }
      localStorage.setItem(
        `project:${id}`,
        JSON.stringify({ id, templateId, imageKeys, createdAt: Date.now() })
      );
      router.push(`/tool/editor/${id}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">

      {/* ── header ── */}
      <div className="flex items-center gap-3 mb-1">
        <div className="h-px w-6" style={{ background: '#6366f1' }} />
        <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#6366f1' }}>New project</span>
      </div>
      <h1 className="text-white tracking-tight mt-2"
        style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.75rem, 3vw, 2.25rem)' }}>
        Set up your project
      </h1>
      <p className="mt-1.5 text-sm" style={{ color: '#6b7280' }}>
        Upload your images first, then tap a template to jump straight into the editor.
      </p>

      {/* ── two-col layout ── */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* ── upload card ── */}
        <div className="rounded-2xl p-6"
          style={{ background: 'rgba(30,32,42,0.45)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)' }}>
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold text-white"
              style={{ background: files.length > 0 ? 'linear-gradient(135deg,#22c55e,#16a34a)' : 'linear-gradient(135deg,#6366f1,#4f46e5)' }}>
              {files.length > 0 ? '✓' : '1'}
            </span>
            <h2 className="text-sm font-semibold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Upload images
            </h2>
          </div>
          <UploadDropzone files={files} onChange={setFiles} />
        </div>

        {/* ── template picker ── */}
        <div className="rounded-2xl p-6"
          style={{ background: 'rgba(30,32,42,0.45)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)' }}>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold text-white"
              style={{ background: 'linear-gradient(135deg,#6366f1,#4f46e5)' }}>2</span>
            <h2 className="text-sm font-semibold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Choose a template
            </h2>
          </div>

          {/* hint copy */}
          <p className="text-xs mb-4" style={{ color: files.length > 0 ? '#22c55e' : '#6b7280' }}>
            {files.length > 0
              ? 'Images ready — tap any template to start editing immediately.'
              : 'Upload images first, then templates become clickable.'}
          </p>

          {/* template grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {templates.map((t) => {
              const active = files.length > 0 && !loading;
              return (
                <button
                  key={t.id}
                  disabled={!active}
                  onClick={() => goToEditor(t.id)}
                  className="relative rounded-xl p-3 text-left transition-all duration-200"
                  style={{
                    background: active ? 'rgba(40,42,55,0.7)' : 'rgba(30,32,42,0.35)',
                    border: active ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.04)',
                    cursor: active ? 'pointer' : 'not-allowed',
                    opacity: active ? 1 : 0.4,
                  }}
                  onMouseEnter={(e) => {
                    if (!active) return;
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(99,102,241,0.5)';
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(99,102,241,0.1)';
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 16px rgba(99,102,241,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    if (!active) return;
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)';
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(40,42,55,0.7)';
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
                  }}
                >
                  {/* arrow icon — only shows on hover when active */}
                  <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: 'rgba(99,102,241,0.2)' }}>
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round">
                      <path d="M2 6h8M7 3l3 3-3 3" />
                    </svg>
                  </div>

                  <div className="text-xs font-semibold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{t.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#6b7280' }}>{t.category}</div>
                </button>
              );
            })}
          </div>

          {loading && (
            <div className="mt-5 flex items-center justify-center gap-2">
              <svg className="animate-spin" style={{ animationDuration: '0.8s' }} width="16" height="16" viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="20" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
                <circle cx="25" cy="25" r="20" fill="none" stroke="#6366f1" strokeWidth="5" strokeLinecap="round" strokeDasharray="60 80" />
              </svg>
              <span className="text-xs" style={{ color: '#6b7280' }}>Saving images…</span>
            </div>
          )}

          <p className="mt-4 text-xs text-center" style={{ color: '#4b5563' }}>
            Images are saved in your browser (IndexedDB) for reliable export.
          </p>
        </div>
      </div>
    </div>
  );
}
