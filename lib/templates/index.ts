import { OverlayTemplate } from "./schema";

import { scandiArch } from "./presets/scandi-arch";
import { boldBadge } from "./presets/bold-badge";
import { bottomBanner } from "./presets/bottom-banner";
import { topRibbon } from "./presets/top-ribbon";
import { cornerTag } from "./presets/corner-tag";
import { modernCard } from "./presets/modern-card";
import { glassStrip } from "./presets/glass-strip";
import { doublePill } from "./presets/double-pill";
import { leftPanel } from "./presets/left-panel";
import { rightCard } from "./presets/right-card";
import { outlineArch } from "./presets/outline-arch";
import { headlineSubhead } from "./presets/headline-subhead";
import { centerFrame } from "./presets/center-frame";
import { minimalBottom } from "./presets/minimal-bottom";
import { numberedTitle } from "./presets/numbered-title";
import { softArchBottom } from "./presets/soft-arch-bottom";
import { boxedTitle } from "./presets/boxed-title";
import { stackedCta } from "./presets/stacked-cta";

export const templates: OverlayTemplate[] = [
  scandiArch,
  boldBadge,
  bottomBanner,
  topRibbon,
  cornerTag,
  modernCard,
  glassStrip,
  doublePill,
  leftPanel,
  rightCard,
  outlineArch,
  headlineSubhead,
  centerFrame,
  minimalBottom,
  numberedTitle,
  softArchBottom,
  boxedTitle,
  stackedCta
];

export const TEMPLATE_CATEGORIES = Array.from(new Set(templates.map(t => t.category)));

export function getTemplateById(id: string): OverlayTemplate {
  return templates.find((t) => t.id === id) ?? templates[0];
}
