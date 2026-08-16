import { clamp } from "./clamp";

export function parseFiniteNumber(value: string): number | null {
  if (value.trim() === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

export function parseClampedNumber(value: string, min: number, max: number): number | null {
  const n = parseFiniteNumber(value);
  if (n === null) return null;
  return clamp(n, min, max);
}

export function isHexColor(value: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(value);
}
