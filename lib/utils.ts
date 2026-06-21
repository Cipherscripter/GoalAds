import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

export const FREE_TIER_LIMIT = 999; // effectively unlimited during testing
export const LOCALSTORAGE_GENERATION_KEY = "goalads_generation_count";

export function getGenerationCount(): number {
  if (typeof window === "undefined") return 0;
  return parseInt(localStorage.getItem(LOCALSTORAGE_GENERATION_KEY) || "0", 10);
}

export function incrementGenerationCount(): number {
  const current = getGenerationCount();
  const next = current + 1;
  localStorage.setItem(LOCALSTORAGE_GENERATION_KEY, next.toString());
  return next;
}

export function isFreeTierExhausted(): boolean {
  return getGenerationCount() >= FREE_TIER_LIMIT;
}
