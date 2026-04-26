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
      {/* Toolbar row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginBottom: 28 }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: '1 1 240px', minWidth: 200, maxWidth: 380 }}>
          <svg
            style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', opacity: 0.4, pointerEvents: 'none' }}
            width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="#f8fafc" strokeWidth="1.8"
          >
            <circle cx="6.5" cy="6.5" r="4.5" /><path d="M10.5 10.5l3 3" strokeLinecap="round" />
          </svg>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search templates…"
            style={{
              width: '100%', padding: '9px 14px 9px 36px', borderRadius: 12,
              border: '1px solid rgba(255,255,255,.10)',
              background: 'rgba(255,255,255,.05)',
              color: '#f8fafc', fontSize: '.875rem', outline: 'none',
              fontFamily: "'DM Sans', system-ui, sans-serif",
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* BgStyleToggle pushed right */}
        <div style={{ marginLeft: 'auto' }}>
          <BgStyleToggle value={bgStyle} onChange={setBgStyle} />
        </div>
      </div>

      {/* Category pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
        {allCats.map((c) => {
          const active = cat === c;
          return (
            <button
              key={c}
              onClick={() => setCat(c)}
              style={{
                padding: '6px 16px', borderRadius: 999, fontSize: '.8rem', fontWeight: 500,
                border: active ? '1px solid #6366f1' : '1px solid rgba(255,255,255,.10)',
                background: active ? 'rgba(99,102,241,.18)' : 'rgba(255,255,255,.04)',
                color: active ? '#a5b4fc' : '#94a3b8',
                cursor: 'pointer', transition: 'all .15s',
                fontFamily: "'DM Sans', system-ui, sans-serif",
              }}
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: '#475569', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
          No templates match your search.
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 20,
        }}>
          {filtered.map((t) => {
            const Clickable: any = onSelect ? "button" : "div";
            return (
              <Clickable
                key={t.id}
                type={onSelect ? "button" : undefined}
                onClick={onSelect ? () => onSelect(t.id) : undefined}
                style={{
                  background: 'rgba(255,255,255,.04)',
                  border: '1px solid rgba(255,255,255,.07)',
                  borderRadius: 16, overflow: 'hidden', textAlign: 'left',
                  cursor: onSelect ? 'pointer' : 'default',
                  transition: 'border-color .2s, transform .2s, box-shadow .2s',
                  padding: 0,
                }}
                onMouseEnter={(e: any) => {
                  e.currentTarget.style.borderColor = 'rgba(99,102,241,.4)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(99,102,241,.12)';
                }}
                onMouseLeave={(e: any) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,.07)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <TemplatePreviewMini template={t} width={220} bgStyle={bgStyle} />
                <div style={{ padding: '12px 14px' }}>
                  <div style={{
                    fontSize: '.875rem', fontWeight: 600, color: '#f1f5f9',
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  }}>{t.name}</div>
                  <div style={{
                    fontSize: '.75rem', color: '#64748b', marginTop: 3,
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                  }}>{t.category}</div>
                </div>
              </Clickable>
            );
          })}
        </div>
      )}
    </div>
  );
}
