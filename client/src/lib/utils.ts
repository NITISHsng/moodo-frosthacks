import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAnonymousId(id: string) {
  if (!id) return 'ANON-USER';
  return `USER-${id.substring(0, 6).toUpperCase()}`;
}
