"use client";

import { useMemo, useState } from "react";
import { templates, TEMPLATE_CATEGORIES } from "@/lib/templates";
import TemplatePreviewMini, { type BgStyle } from "./TemplatePreviewMini";
import BgStyleToggle from "./BgStyleToggle";

export default function TemplateGallery() {
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
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="sm:ml-auto sm:pl-2"><BgStyleToggle value={bgStyle} onChange={setBgStyle} /></div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search templates (e.g. arch, recipe, quote)…"
          className="w-full sm:max-w-md rounded-xl border px-4 py-2 text-sm bg-white"
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
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((t) => (
          <div key={t.id} className="group overflow-hidden rounded-2xl">
            <TemplatePreviewMini template={t} width={220} bgStyle={bgStyle} />
            <div className="mt-2">
              <div className="text-sm font-medium">{t.name}</div>
              <div className="text-xs text-neutral-600">{t.category}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
