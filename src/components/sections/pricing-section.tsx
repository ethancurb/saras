/**
 * Pricing Section Component for SARAS Fitness Application
 *
 * This component displays the pricing plans for the SARAS AI fitness app.
 * Features:
 * - Single premium pricing tier with early access discount
 * - Prominent early release badge positioning above the card
 * - Soft glow effect around the pricing card for premium feel
 * - Comprehensive feature list with check icons
 * - Call-to-action button and trust indicators
 * - Responsive design with centered layout
 * - Dark mode support throughout
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Premium pricing plan configuration
// Contains all plan details, features, pricing, and display options
const pricingPlans = [
  {
    id: 'ultimate',
    name: 'Ultimate',
    description: 'The complete premium AI fitness experience',
    price: 9.99,
    originalPrice: 29.99,
    interval: 'month',
    features: [
      'Full access to SARAS Engine generated workouts',
      'Personalized nutrition optimization',
      'Recovery and sleep recommendations',
      'Advanced tracking and analytics',
      'Early access to new features',
    ],
    ctaText: 'Join SARAS Ultimate',
    highlighted: true,
    badge: 'Early Release Rate',
  },
];

/**
 * Main Pricing Section Component
 *
 * Renders the complete pricing section with:
 * - Hero header with compelling messaging
 * - Single centered pricing card with early access badge
 * - Feature list with visual check indicators
 * - Trust signals and guarantees
 * - Early access information panel
 *
 * @returns {JSX.Element} Complete pricing section
 */
export function PricingSection() {
  return (
    <section
      id='pricing'
      className='section-padding bg-white dark:bg-dark-background'
    >
      <div className='container-premium'>
        <div className='space-y-16'>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='text-center space-y-6'
          >
            <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white max-w-4xl mx-auto'>
              Ultimate AI Fitness Experience
            </h2>

            <p className='text-xl text-gray-600 dark:text-white max-w-3xl mx-auto leading-relaxed'>
              Get exclusive early access to the revolutionary SARAS Engine at a
              special launch price. Limited time offer for visionary fitness
              enthusiasts.
            </p>
          </motion.div>

          {/* Pricing Card - Centered layout with improved spacing */}
          <div className='flex justify-center items-center'>
            <div className='max-w-lg w-full mx-auto'>
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className='relative'
                >
                  {plan.badge && (
                    <div className='absolute -top-6 left-1/2 transform -translate-x-1/2 z-10'>
                      <div className='px-6 py-3 bg-black text-white text-sm font-semibold rounded-full shadow-lg'>
                        {plan.badge}
                      </div>
                    </div>
                  )}

                  <Card
                    variant='accent'
                    size='xl'
                    className='ring-2 ring-gray-200 dark:ring-white/20 shadow-2xl backdrop-blur-sm bg-white/95 dark:bg-black/95 relative overflow-hidden'
                    style={{
                      boxShadow:
                        '0 0 50px rgba(0, 0, 0, 0.1), 0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    }}
                  >
                    <CardHeader className='text-center'>
                      <CardTitle className='text-3xl'>{plan.name}</CardTitle>
                      <CardDescription className='text-lg'>
                        {plan.description}
                      </CardDescription>

                      {/* Price */}
                      <div className='pt-6'>
                        <div className='flex items-baseline justify-center mb-2'>
                          <span className='text-6xl font-bold text-gray-900 dark:text-white'>
                            ${plan.price}
                          </span>
                          <span className='text-xl text-gray-500 dark:text-white ml-1'>
                            /{plan.interval}
                          </span>
                        </div>

                        {/* Original Price */}
                        {plan.originalPrice && (
                          <div className='flex items-center justify-center space-x-2'>
                            <span className='text-lg text-gray-400 dark:text-white line-through'>
                              ${plan.originalPrice}/{plan.interval}
                            </span>
                            <span className='px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-sm font-semibold rounded'>
                              67% OFF
                            </span>
                          </div>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className='space-y-8'>
                      {/* Features List */}
                      <ul className='space-y-4'>
                        {plan.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className='flex items-start space-x-3'
                          >
                            <Check className='w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5' />
                            <span className='text-gray-700 dark:text-white font-medium'>
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA Button */}
                      <Button
                        variant='primary'
                        size='xl'
                        className='w-full text-lg py-4'
                      >
                        {plan.ctaText}
                      </Button>

                      {/* Trust Indicators */}
                      <div className='text-center space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700'>
                        <p className='text-sm text-gray-600 dark:text-white'>
                          ✓ Cancel anytime. No notice. No fees. No tricks.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='text-center space-y-6'
          >
            <div className='bg-white dark:bg-black border border-black/20 dark:border-white/20 rounded-2xl p-6 max-w-2xl mx-auto'>
              <h4 className='text-lg font-semibold text-gray-800 dark:text-white mb-2'>
                🚀 Early Access Pricing
              </h4>
              <p className='text-gray-700 dark:text-white'>
                Lock in this exclusive rate of $9.99/month while we're in early
                access. Price increases to $29.99/month after launch. Your rate
                stays locked <strong>forever</strong>.
              </p>
            </div>

            <div className='flex flex-wrap justify-center items-center space-x-8 text-sm text-gray-500 dark:text-white'>
              <span>✓ Cancel anytime. No notice. No fees. No tricks.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
