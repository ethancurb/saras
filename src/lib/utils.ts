/**
 * Utility functions for combining Tailwind CSS classes
 * Provides type-safe class merging with proper conflict resolution
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names with proper Tailwind CSS conflict resolution
 * @param inputs - Class names, objects, or arrays to combine
 * @returns Merged class string with conflicts resolved
 * 
 * @example
 * cn('px-2 py-1', 'px-4') // Returns 'py-1 px-4'
 * cn('text-red-500', condition && 'text-blue-500') // Conditional classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}