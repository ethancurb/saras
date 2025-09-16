/**
 * Luxury Card Component for SARAS Fitness Application
 * Provides elegant, reusable card containers with sophisticated styling and animations
 */

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Card variant definitions using class-variance-authority
const cardVariants = cva(
  // Base card styles
  'rounded-2xl border transition-all duration-300',
  {
    variants: {
      // Visual variants for different contexts
      variant: {
        // Default - clean white background with dark mode support
        default: 'bg-white dark:bg-dark-background-tertiary border-gray-200 dark:border-dark-border shadow-lg hover:shadow-xl',
        
        // Glass - subtle glassmorphism effect
        glass: 'bg-white/80 dark:bg-dark-background/80 backdrop-blur-md border-white/20 dark:border-gray-600/20 shadow-lg',
        
        // Elevated - stronger shadow for prominence
        elevated: 'bg-white dark:bg-dark-background-tertiary border-gray-100 dark:border-dark-border shadow-xl hover:shadow-2xl',
        
        // Dark - for dark sections
        dark: 'bg-black dark:bg-black border-black dark:border-black text-white shadow-xl',
        
        // Accent - highlighted with brand colors
        accent: 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 border-gray-200/50 dark:border-gray-700/50 shadow-lg',
      },
      
      // Size variants
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
      
      // Interactive states
      interactive: {
        none: '',
        hover: 'hover:-translate-y-1 hover:scale-[1.02] cursor-pointer',
        click: 'hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] cursor-pointer',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      interactive: 'none',
    },
  }
);

// Card component props interface
interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

/**
 * Main Card Component
 * Flexible container with luxury styling options
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, interactive, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, size, interactive, className }))}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

/**
 * Card Header Component
 * For card titles and descriptions
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 pb-6', className)}
    {...props}
  />
));

CardHeader.displayName = 'CardHeader';

/**
 * Card Title Component
 * Primary heading for cards
 */
const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight text-gray-900 dark:text-white',
      className
    )}
    {...props}
  >
    {children}
  </h3>
));

CardTitle.displayName = 'CardTitle';

/**
 * Card Description Component
 * Supporting text for cards
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-base text-gray-600 dark:text-white leading-relaxed', className)}
    {...props}
  />
));

CardDescription.displayName = 'CardDescription';

/**
 * Card Content Component
 * Main content area of cards
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('pt-0', className)}
    {...props}
  />
));

CardContent.displayName = 'CardContent';

/**
 * Card Footer Component
 * Actions and secondary content
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-6', className)}
    {...props}
  />
));

CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
};
export type { CardProps };