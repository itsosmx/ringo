import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function RandomColor() {
  return `hsl(${Math.floor(Math.random() * 360)}, 20%, 50%)`
}