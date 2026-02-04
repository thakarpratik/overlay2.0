"use client";

import { useCallback } from "react";

export default function UploadDropzone({
  files,
  onChange
}: {
  files: File[];
  onChange: (files: File[]) => void;
}) {
  const onFiles = useCallback(
    (list: FileList | null) => {
      if (!list) return;
      const next = Array.from(list).filter((f) => f.type.startsWith("image/"));
      onChange([...files, ...next].slice(0, 60));
    },
    [files, onChange]
  );

  return (
    <div className="space-y-4">
      <label className="block rounded-2xl border border-dashed bg-neutral-50 p-8 text-center cursor-pointer hover:bg-neutral-100">
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => onFiles(e.target.files)}
        />
        <div className="font-medium">Drop images here or click to upload</div>
        <div className="mt-1 text-sm text-neutral-600">PNG/JPG/WebP • up to 60 images</div>
      </label>

      {files.length > 0 && (
        <div className="text-sm text-neutral-700">
          <span className="font-medium">{files.length}</span> image(s) selected
        </div>
      )}
    </div>
  );
}
