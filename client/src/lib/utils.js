import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getAnonymousId(id) {
  if (!id) return "ANON-USER";
  return `USER-${id.substring(0, 6).toUpperCase()}`;
}
