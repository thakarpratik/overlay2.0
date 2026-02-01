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
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">New project</h1>
      <p className="mt-2 text-neutral-600">Upload images and pick a template. (MVP is 2:3 — more sizes next.)</p>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border bg-white p-6">
          <h2 className="font-medium">1) Upload images</h2>
          <div className="mt-4">
            <UploadDropzone files={files} onChange={setFiles} />
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6">
          <h2 className="font-medium">2) Choose a template</h2>
          <div className="mt-4">
            <TemplateBrowser value={templateId} onChange={setTemplateId} />
          </div>

          <button
            onClick={onStart}
            disabled={!canStart}
            className="mt-6 w-full rounded-xl bg-black text-white px-5 py-3 disabled:opacity-40"
          >
            {loading ? "Preparing…" : "Start editing"}
          </button>

          <p className="mt-3 text-xs text-neutral-500">
            Images are saved in your browser (IndexedDB) for reliable export.
          </p>
        </div>
      </div>
    </div>
  );
}
