import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function sleep(delay: number, fn?: any) {
  return new Promise((resolve) =>
    setTimeout(() => {
      return resolve(fn)
    }, delay)
  )
}
