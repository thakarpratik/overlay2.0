"use client";

import { useState } from "react";
import { templates } from "@/lib/templates";
import { useRouter } from "next/navigation";
import UploadDropzone from "@/components/editor/UploadDropzone";
import TemplateBrowser from "@/components/editor/TemplateBrowser";
import { saveImage } from "@/lib/storage/images";

export default function NewProjectPage() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [templateId, setTemplateId] = useState<string>(templates[0]?.id ?? "scandi-arch");
  const [loading, setLoading] = useState(false);

  const canStart = files.length > 0 && !!templateId && !loading;

  const onStart = async () => {
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
    <div className="mx-auto max-w-7xl px-5 py-12">

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
        Upload images and pick a template to get started. MVP canvas is 2:3.
      </p>

      {/* ── two-col layout ── */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* ── upload card ── */}
        <div className="rounded-2xl p-6"
          style={{ background: 'rgba(30,32,42,0.45)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)' }}>

          {/* step label */}
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold text-white"
              style={{ background: 'linear-gradient(135deg,#6366f1,#4f46e5)' }}>1</span>
            <h2 className="text-sm font-semibold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Upload images
            </h2>
          </div>

          <UploadDropzone files={files} onChange={setFiles} />
        </div>

        {/* ── template card ── */}
        <div className="rounded-2xl p-6"
          style={{ background: 'rgba(30,32,42,0.45)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)' }}>

          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold text-white"
              style={{ background: 'linear-gradient(135deg,#6366f1,#4f46e5)' }}>2</span>
            <h2 className="text-sm font-semibold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Choose a template
            </h2>
          </div>

          <TemplateBrowser value={templateId} onChange={setTemplateId} />

          {/* CTA */}
          <button
            onClick={onStart}
            disabled={!canStart}
            className="mt-6 w-full rounded-full text-white text-sm font-semibold px-5 py-3 transition-all duration-200"
            style={{
              background: canStart ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : 'rgba(99,102,241,0.25)',
              boxShadow: canStart ? '0 4px 20px rgba(99,102,241,0.3)' : 'none',
              color: canStart ? '#fff' : '#6b7280',
              cursor: canStart ? 'pointer' : 'not-allowed',
            }}
          >
            {loading ? "Preparing…" : "Start editing"}
          </button>

          <p className="mt-3 text-xs text-center" style={{ color: '#4b5563' }}>
            Images are saved in your browser (IndexedDB) for reliable export.
          </p>
        </div>
      </div>
    </div>
  );
}
