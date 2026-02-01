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

  if (!ready) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="rounded-2xl border bg-white p-6">Loading project…</div>
      </div>
    );
  }

  return <EditorShell />;
}
