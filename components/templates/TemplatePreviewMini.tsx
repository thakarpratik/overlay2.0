"use client";

import { OverlayTemplate } from "@/lib/templates/schema";

export type BgStyle = "colorful" | "neutral" | "dark";

function shadowCss(kind?: "none" | "soft" | "medium") {
  if (!kind || kind === "none") return "none";
  if (kind === "soft") return "0 10px 24px rgba(0,0,0,.10)";
  return "0 16px 40px rgba(0,0,0,.16)";
}

function hashIndex(id: string, mod: number) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h % mod;
}

const COLORFUL = [
  "linear-gradient(135deg, rgba(99,102,241,.22), rgba(236,72,153,.16)), radial-gradient(circle at 20% 20%, rgba(14,165,233,.22), transparent 60%), radial-gradient(circle at 70% 80%, rgba(34,197,94,.16), transparent 55%)",
  "linear-gradient(135deg, rgba(244,114,182,.18), rgba(250,204,21,.14)), radial-gradient(circle at 25% 30%, rgba(168,85,247,.16), transparent 60%), radial-gradient(circle at 70% 75%, rgba(59,130,246,.16), transparent 55%)",
  "linear-gradient(135deg, rgba(34,197,94,.16), rgba(59,130,246,.14)), radial-gradient(circle at 30% 20%, rgba(236,72,153,.16), transparent 60%), radial-gradient(circle at 75% 80%, rgba(250,204,21,.14), transparent 55%)",
  "linear-gradient(135deg, rgba(250,204,21,.16), rgba(14,165,233,.14)), radial-gradient(circle at 25% 25%, rgba(99,102,241,.16), transparent 60%), radial-gradient(circle at 70% 78%, rgba(244,114,182,.14), transparent 55%)",
  "linear-gradient(135deg, rgba(168,85,247,.16), rgba(34,197,94,.14)), radial-gradient(circle at 30% 25%, rgba(250,204,21,.14), transparent 60%), radial-gradient(circle at 75% 78%, rgba(14,165,233,.14), transparent 55%)"
];

const NEUTRAL = [
  "linear-gradient(135deg, rgba(17,17,17,.10), rgba(17,17,17,.02)), radial-gradient(circle at 20% 20%, rgba(0,0,0,.10), transparent 60%), radial-gradient(circle at 70% 80%, rgba(0,0,0,.06), transparent 55%)",
  "linear-gradient(135deg, rgba(0,0,0,.08), rgba(0,0,0,.02)), radial-gradient(circle at 30% 20%, rgba(0,0,0,.10), transparent 60%), radial-gradient(circle at 70% 75%, rgba(0,0,0,.06), transparent 55%)"
];

const DARK = [
  "linear-gradient(135deg, rgba(0,0,0,.65), rgba(17,24,39,.80)), radial-gradient(circle at 20% 20%, rgba(99,102,241,.22), transparent 55%), radial-gradient(circle at 80% 75%, rgba(236,72,153,.18), transparent 55%)",
  "linear-gradient(135deg, rgba(0,0,0,.60), rgba(0,0,0,.85)), radial-gradient(circle at 20% 25%, rgba(34,197,94,.18), transparent 55%), radial-gradient(circle at 80% 80%, rgba(14,165,233,.18), transparent 55%)"
];

function backdropFor(templateId: string, style: BgStyle) {
  if (style === "colorful") return COLORFUL[hashIndex(templateId, COLORFUL.length)];
  if (style === "dark") return DARK[hashIndex(templateId, DARK.length)];
  return NEUTRAL[hashIndex(templateId, NEUTRAL.length)];
}

export default function TemplatePreviewMini({
  template,
  width = 240,
  bgStyle = "colorful"
}: {
  template: OverlayTemplate;
  width?: number;
  bgStyle?: BgStyle;
}) {
  const W = width;
  const H = Math.round((width * 3) / 2);

  const sx = W / template.canvas.width;
  const sy = H / template.canvas.height;

  const overlay =
    bgStyle === "dark"
      ? "linear-gradient(to bottom, rgba(255,255,255,.04), rgba(255,255,255,.10))"
      : "linear-gradient(to bottom, rgba(255,255,255,.05), rgba(255,255,255,.35))";

  return (
    <div className="relative overflow-hidden rounded-xl border bg-white" style={{ width: W, height: H }}>
      <div className="absolute inset-0" style={{ background: backdropFor(template.id, bgStyle) }} />
      <div className="absolute inset-0" style={{ background: overlay }} />

      {template.layers.map((l) => {
        const style: React.CSSProperties = {
          position: "absolute",
          left: l.x * sx,
          top: l.y * sy,
          width: l.w * sx,
          height: l.h * sy,
          opacity: l.opacity ?? 1,
          transform: `rotate(${l.rotation ?? 0}deg)`
        };

        if (l.type === "shape") {
          const radius = l.shape === "circle" ? 9999 : l.radius ?? 24;
          const border = l.border ? `${Math.max(1, l.border.width * sx)}px solid ${l.border.color}` : "none";
          return (
            <div
              key={l.id}
              style={{
                ...style,
                background: l.fill,
                borderRadius: radius,
                border,
                boxShadow: shadowCss(l.shadow)
              }}
            />
          );
        }

        const t = l as any;
        const stroke = t.stroke ? `${t.stroke.width * sx}px ${t.stroke.color}` : null;

        return (
          <div
            key={t.id}
            style={{
              ...style,
              display: "flex",
              alignItems: "center",
              justifyContent: t.align === "left" ? "flex-start" : t.align === "right" ? "flex-end" : "center",
              padding: 8,
              color: t.color,
              fontFamily: t.fontFamily,
              fontWeight: t.fontWeight,
              fontSize: Math.max(10, t.fontSize * sx),
              lineHeight: t.lineHeight,
              letterSpacing: `${(t.letterSpacing ?? 0) * sx}px`,
              textAlign: t.align,
              whiteSpace: "pre-wrap",
              textShadow: t.textShadow
            }}
          >
            <span style={stroke ? ({ WebkitTextStroke: stroke } as any) : undefined}>{t.text}</span>
          </div>
        );
      })}
    </div>
  );
}
