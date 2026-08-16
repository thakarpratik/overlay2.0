"use client";

import { useCallback, useState } from "react";

export default function UploadDropzone({
  files,
  onChange
}: {
  files: File[];
  onChange: (files: File[]) => void;
}) {
  const [over, setOver] = useState(false);

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
      <label
        className="block rounded-2xl border border-dashed p-8 text-center cursor-pointer transition-colors"
        style={{
          background: over ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.03)",
          borderColor: over ? "rgba(99,102,241,0.55)" : "rgba(255,255,255,0.16)",
          color: "#e5e7eb",
        }}
        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setOver(true); }}
        onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); setOver(true); }}
        onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setOver(false); }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOver(false);
          onFiles(e.dataTransfer.files);
        }}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => onFiles(e.target.files)}
        />
        <div className="font-medium">Drop images here or click to upload</div>
        <div className="mt-1 text-sm" style={{ color: "#9ca3af" }}>PNG/JPG/WebP • up to 60 images</div>
      </label>

      {files.length > 0 && (
        <div className="text-sm" style={{ color: "#d1d5db" }}>
          <span className="font-medium">{files.length}</span> image(s) selected
        </div>
      )}
    </div>
  );
}
