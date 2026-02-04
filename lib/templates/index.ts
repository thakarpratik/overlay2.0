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
import { numberedList } from "./presets/numbered-list";
import { gradientSplit } from "./presets/gradient-split";
import { glassCard } from "./presets/glass-card";
import { neonGlow } from "./presets/neon-glow";
import { magazineCover } from "./presets/magazine-cover";
import { brutalistGeo } from "./presets/brutalist-geo";
import { softAesthetic } from "./presets/soft-aesthetic";
import { bigNumber } from "./presets/big-number";
import { polaroidFrame } from "./presets/polaroid-frame";
import { quoteCard } from "./presets/quote-card";
import { stepByStep } from "./presets/step-by-step";
import { productSpotlight } from "./presets/product-spotlight";
import { recipeCard } from "./presets/recipe-card";
import { beforeAfter } from "./presets/before-after";
import { countdownTimer } from "./presets/countdown-timer";
import { checklistCard } from "./presets/checklist-card";
import { travelDestination } from "./presets/travel-destination";
import { workoutMotivation } from "./presets/workout-motivation";
import { podcastEpisode } from "./presets/podcast-episode";
import { minimalType } from "./presets/minimal-type";
import { testimonialCard } from "./presets/testimonial-card";
import { retroBadge } from "./presets/retro-badge";
import { comicPop } from "./presets/comic-pop";

export const templates: OverlayTemplate[] = [
  // Original templates
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
  stackedCta,
  // New amazing templates
  numberedList,
  gradientSplit,
  glassCard,
  neonGlow,
  magazineCover,
  brutalistGeo,
  softAesthetic,
  bigNumber,
  polaroidFrame,
  quoteCard,
  stepByStep,
  productSpotlight,
  recipeCard,
  beforeAfter,
  countdownTimer,
  checklistCard,
  travelDestination,
  workoutMotivation,
  podcastEpisode,
  minimalType,
  testimonialCard,
  retroBadge,
  comicPop
];

export const TEMPLATE_CATEGORIES = Array.from(new Set(templates.map(t => t.category)));

export function getTemplateById(id: string): OverlayTemplate {
  return templates.find((t) => t.id === id) ?? templates[0];
}
