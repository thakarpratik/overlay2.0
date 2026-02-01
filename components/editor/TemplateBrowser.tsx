"use client";

import { useMemo, useState } from "react";
import { templates, TEMPLATE_CATEGORIES } from "@/lib/templates";
import TemplatePreviewMini, { type BgStyle } from "@/components/templates/TemplatePreviewMini";
import BgStyleToggle from "@/components/templates/BgStyleToggle";

export default function TemplateBrowser({
  value,
  onChange
}: {
  value: string;
  onChange: (id: string) => void;
}) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const [bgStyle, setBgStyle] = useState<BgStyle>("colorful");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return templates.filter((t) => {
      const okCat = cat === "All" || t.category === cat;
      if (!okCat) return false;
      if (!query) return true;
      const hay = [t.name, t.category, ...(t.tags ?? [])].join(" ").toLowerCase();
      return hay.includes(query);
    });
  }, [q, cat]);

  return (
    <div>
      <div className="flex flex-col gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search templates…"
          className="w-full rounded-xl border px-4 py-2 text-sm bg-white"
        />

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCat("All")}
            className={["rounded-full px-3 py-1 text-sm border", cat === "All" ? "bg-black text-white border-black" : "bg-white"].join(" ")}
          >
            All
          </button>
          {TEMPLATE_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={["rounded-full px-3 py-1 text-sm border", cat === c ? "bg-black text-white border-black" : "bg-white"].join(" ")}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="pt-1">
          <BgStyleToggle value={bgStyle} onChange={setBgStyle} />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
        {filtered.map((t) => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={[
              "text-left rounded-2xl border bg-white p-2 hover:border-black transition overflow-hidden",
              value === t.id ? "border-black ring-2 ring-black/10" : "border-neutral-200"
            ].join(" ")}
          >
            <div className="w-full flex justify-center">
              <TemplatePreviewMini template={t} width={200} bgStyle={bgStyle} />
            </div>
            <div className="mt-2 px-1">
              <div className="text-sm font-medium">{t.name}</div>
              <div className="text-xs text-neutral-600">{t.category}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
