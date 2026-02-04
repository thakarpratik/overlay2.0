"use client";

import { templates } from "@/lib/templates";

export default function TemplatePicker({
  value,
  onChange
}: {
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {templates.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={[
            "rounded-2xl border bg-white p-3 text-left hover:border-black",
            value === t.id ? "border-black ring-2 ring-black/10" : "border-neutral-200"
          ].join(" ")}
        >
          <div className="text-sm font-medium">{t.name}</div>
          <div className="text-xs text-neutral-600">{t.category}</div>
        </button>
      ))}
    </div>
  );
}
