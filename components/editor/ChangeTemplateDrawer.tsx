"use client";
import { useState } from "react";
import TemplateGallery from "@/components/templates/TemplateGallery";
import { useRouter, useSearchParams } from "next/navigation";

export default function ChangeTemplateDrawer({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useSearchParams();

  return (
    <>
      <button onClick={() => setOpen(true)} className="rounded-lg border bg-white px-3 py-2 text-sm hover:bg-neutral-50">
        Change template
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-3xl bg-white shadow-xl p-4 overflow-auto">
            <div className="flex items-center justify-between mb-3">
              <div className="font-medium">Choose a new template</div>
              <button className="text-sm text-neutral-600" onClick={() => setOpen(false)}>Close</button>
            </div>
            <TemplateGallery
              onSelect={(tplId: string) => {
                const q = new URLSearchParams(params?.toString());
                q.set("templateId", tplId);
                router.push(`/tool/editor/${projectId}?${q.toString()}`);
                setOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
