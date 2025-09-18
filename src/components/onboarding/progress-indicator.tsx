/**
 * Progress Indicator Component for SARAS Onboarding
 *
 * Visual progress tracker for the multi-step onboarding flow.
 * Features:
 * - Step-by-step progress visualization
 * - Current step highlighting
 * - Completed step indicators
 * - Responsive design for mobile and desktop
 * - Luxury design aesthetic matching SARAS brand
 * - Smooth animations and transitions
 * - Dark mode support
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

// Step definition interface
interface Step {
  id: string;
  title: string;
  description: string;
}

// Component props interface
interface ProgressIndicatorProps {
  steps: readonly Step[];
  currentStep: number;
}

/**
 * Progress Indicator Component
 *
 * Renders a horizontal progress bar with step indicators:
 * - Shows completed steps with check marks
 * - Highlights current step
 * - Displays remaining steps as inactive
 * - Responsive design that adapts to screen size
 *
 * @param steps - Array of step definitions
 * @param currentStep - Zero-based index of current step
 * @returns {JSX.Element} Progress indicator component
 */
export function ProgressIndicator({ steps, currentStep }: ProgressIndicatorProps) {
  return (
    <div className='flex items-center justify-center space-x-2 md:space-x-4'>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isUpcoming = index > currentStep;

        return (
          <div key={step.id} className='flex items-center'>
            {/* Step Circle */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`
                relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border-2 transition-all duration-300
                ${
                  isCompleted
                    ? 'bg-black dark:bg-white border-black dark:border-white'
                    : isCurrent
                    ? 'bg-white dark:bg-dark-background border-black dark:border-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600'
                }
              `}
            >
              {/* Step Content */}
              {isCompleted ? (
                <Check className='w-4 h-4 md:w-5 md:h-5 text-white dark:text-black' />
              ) : (
                <span
                  className={`
                    text-sm md:text-base font-semibold
                    ${
                      isCurrent
                        ? 'text-black dark:text-white'
                        : 'text-gray-500 dark:text-gray-400'
                    }
                  `}
                >
                  {index + 1}
                </span>
              )}

              {/* Current Step Pulse Effect */}
              {isCurrent && (
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className='absolute inset-0 rounded-full border-2 border-black dark:border-white'
                />
              )}
            </motion.div>

            {/* Step Title (Hidden on mobile) */}
            <div className='hidden md:block ml-3 min-w-0'>
              <div
                className={`
                  text-sm font-medium truncate
                  ${
                    isCurrent
                      ? 'text-black dark:text-white'
                      : isCompleted
                      ? 'text-gray-700 dark:text-gray-300'
                      : 'text-gray-400 dark:text-gray-500'
                  }
                `}
              >
                {step.title}
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`
                  hidden md:block w-12 lg:w-16 h-0.5 mx-4 transition-colors duration-300
                  ${
                    index < currentStep
                      ? 'bg-black dark:bg-white'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}