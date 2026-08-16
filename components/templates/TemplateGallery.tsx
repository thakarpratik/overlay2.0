"use client";

import { useMemo, useState } from "react";
import { templates, TEMPLATE_CATEGORIES } from "@/lib/templates";
import TemplatePreviewMini, { type BgStyle } from "./TemplatePreviewMini";
import BgStyleToggle from "./BgStyleToggle";

type TemplateGalleryProps = {
  onSelect?: (tplId: string) => void;
};

export default function TemplateGallery({ onSelect }: TemplateGalleryProps) {
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

  const allCats = ["All", ...TEMPLATE_CATEGORIES];

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", marginBottom: 22 }}>
        <label className="sr-only" htmlFor="tpl-search">Search templates</label>
        <input
          id="tpl-search"
          className="gallery-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search plates…"
        />
        <div style={{ marginLeft: "auto" }}>
          <BgStyleToggle value={bgStyle} onChange={setBgStyle} />
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }} role="group" aria-label="Categories">
        {allCats.map((c) => (
          <button
            key={c}
            type="button"
            className="chip"
            aria-pressed={cat === c}
            onClick={() => setCat(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="prose">No plates match that search.</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 16,
        }}>
          {filtered.map((t) => {
            const Clickable: "button" | "div" = onSelect ? "button" : "div";
            return (
              <Clickable
                key={t.id}
                type={onSelect ? "button" : undefined}
                className="tpl-card"
                onClick={onSelect ? () => onSelect(t.id) : undefined}
              >
                <TemplatePreviewMini template={t} width={220} bgStyle={bgStyle} />
                <div className="tpl-meta">
                  <strong>{t.name}</strong>
                  <span>{t.category}</span>
                </div>
              </Clickable>
            );
          })}
        </div>
      )}
    </div>
  );
}
