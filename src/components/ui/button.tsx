/**
 * Premium Button Component for SARAS Fitness Application
 * 
 * Provides a comprehensive set of button variants for consistent UI:
 * - Primary: Black/white theme with minimal styling
 * - Secondary: Subtle gray backgrounds for secondary actions  
 * - Outline: Border-only design for minimal emphasis
 * - Accent: Dark gray for special actions (replaces blue)
 * - Ghost: Transparent with hover effects for navigation
 * - Premium: Elegant gradient effects for high-priority actions
 * 
 * Features:
 * - Multiple size variants (sm, md, lg, xl)
 * - Dark mode support across all variants
 * - Smooth hover animations and scaling effects
 * - Accessible focus states with ring indicators
 * - Consistent spacing and typography
 * - Professional neutral color palette
 */

import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Button variant definitions using class-variance-authority for type-safe styling
/**
 * Button variant styles using class-variance-authority
 * 
 * Each variant provides specific styling for different use cases:
 * - default: Clean monochrome design for primary actions
 * - secondary: Subtle gray for secondary actions
 * - outline: Minimal border-only styling
 * - accent: Dark gray accent for special emphasis
 * - ghost: Transparent design for navigation elements
 * - premium: Gradient effects for premium actions
 */
const buttonVariants = cva(
  // Base button styles - shared across all variants
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-base font-medium transition-all duration-300 ease-in-out transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95',
  {
    variants: {
      // Visual variants for different use cases
      variant: {
        // Primary - sleek black for main CTAs
        primary:
          'bg-black dark:bg-white text-white dark:text-black hover:bg-black/80 dark:hover:bg-white/80 focus-visible:ring-black shadow-lg hover:shadow-xl hover:scale-105',
        
        // Secondary - elegant outline style
        secondary:
          'bg-transparent text-black dark:text-white border-2 border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black focus-visible:ring-gray-500 hover:scale-105',
        
        // Accent - pure black/white for special actions  
        accent:
          'bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80 focus-visible:ring-black shadow-lg hover:shadow-xl hover:scale-105',
        
        // Ghost - minimal styling for subtle actions
        ghost:
          'bg-transparent text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 focus-visible:ring-black hover:scale-105',
        
        // Premium - elegant gradient effect
        premium:
          'bg-gradient-to-r from-black to-gray-700 text-white hover:from-gray-800 hover:to-black dark:from-white dark:to-gray-200 dark:text-black dark:hover:from-gray-100 dark:hover:to-white focus-visible:ring-gray-500 shadow-lg hover:shadow-xl hover:scale-105',
      },
      
      // Size variants for different contexts
      size: {
        sm: 'h-10 px-4 py-2 text-sm',
        md: 'h-12 px-6 py-3 text-base',
        lg: 'h-14 px-8 py-4 text-lg',
        xl: 'h-16 px-10 py-5 text-xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

// Button component props interface
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean; // Allows button to render as a different element (e.g., Link)
  loading?: boolean; // Shows loading state
  icon?: React.ReactNode; // Optional icon element
  iconPosition?: 'left' | 'right'; // Icon positioning
}

/**
 * Luxury Button Component
 * 
 * @param className - Additional CSS classes
 * @param variant - Button visual style
 * @param size - Button size
 * @param asChild - Whether to render as child element
 * @param loading - Loading state
 * @param icon - Optional icon
 * @param iconPosition - Icon position relative to text
 * @param children - Button content
 * @param props - Additional HTML button attributes
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      icon,
      iconPosition = 'left',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // Use Slot component for polymorphic rendering when asChild is true
    const Comp = asChild ? Slot : 'button';
    
    // Combine loading and disabled states
    const isDisabled = disabled || loading;
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {/* Loading spinner */}
        {loading && (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-transparent border-t-current" />
        )}
        
        {/* Left icon */}
        {icon && iconPosition === 'left' && !loading && (
          <span className="mr-2 flex-shrink-0">{icon}</span>
        )}
        
        {/* Button content */}
        <span className="flex-grow">{children}</span>
        
        {/* Right icon */}
        {icon && iconPosition === 'right' && !loading && (
          <span className="ml-2 flex-shrink-0">{icon}</span>
        )}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
export type { ButtonProps };