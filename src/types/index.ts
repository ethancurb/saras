/**
 * TypeScript type definitions for the SARAS luxury fitness application
 * Includes component props, API responses, and business logic types
 */

import { type LucideIcon } from 'lucide-react';

// Navigation and UI component types
export interface NavigationItem {
  label: string;
  href: string;
  icon?: LucideIcon;
  description?: string;
}

// Feature showcase types
export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  highlight?: boolean;
}

// Pricing plan types (placeholder for future implementation)
export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  highlighted?: boolean;
  ctaText: string;
}

// Testimonial types (placeholder for future implementation)
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  avatar?: string;
  rating: number;
}

// Component prop types
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Button variant types for consistent styling
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'premium';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

// Animation and motion types
export interface MotionProps {
  initial?: object;
  animate?: object;
  transition?: object;
  delay?: number;
}