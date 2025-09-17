/**
 * SARAS Home Page - Main Landing Experience
 *
 * Premium AI fitness companion landing page featuring:
 * - Hero section with sophisticated animations and brand messaging
 * - Feature showcase sections highlighting AI capabilities
 * - Integrated pricing section with early access offers
 * - Call-to-action sections driving user conversion
 * - Responsive design with dark mode support
 * - Premium visual effects and micro-interactions
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FeaturesSection } from '@/components/sections/features-section';
import { PricingSection } from '@/components/sections/pricing-section';

/**
 * Home Page Component
 *
 * Main landing page structure with multiple sections:
 * - HeroSection: Primary brand introduction and value proposition
 * - FeaturesSection: Detailed feature showcase with AI capabilities
 * - PricingSection: Early access pricing with compelling offers
 *
 * Features premium hero section with sophisticated animations and clear value proposition
 * Optimized for conversion with strategic content flow and visual hierarchy
 */
export default function HomePage() {
  return (
    <div className='relative min-h-screen overflow-hidden'>
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Pricing Section */}
      <PricingSection />
    </div>
  );
}

/**
 * Hero Section Component
 *
 * Main landing section featuring:
 * - Premium branding with sophisticated visual effects
 * - Compelling messaging about AI fitness innovation
 * - Animated background elements with floating orbs
 * - Brand announcement badge for SARAS Engine
 * - Primary call-to-action buttons
 * - Responsive typography and spacing
 * - Dark mode support with elegant transitions
 *
 * Design emphasizes premium feel through:
 * - Clean typography hierarchy
 * - Subtle animations and micro-interactions
 * - Professional color palette
 * - Generous white space usage
 */
function HeroSection() {
  return (
    <section className='relative min-h-screen flex items-center justify-center'>
      {/* Background Elements */}
      <div className='absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white dark:from-dark-background dark:via-dark-background-secondary dark:to-dark-background' />

      {/* Pure geometric background pattern for visual depth */}
      <div className='absolute inset-0 opacity-30'>
        <div className='absolute top-1/4 left-1/4 w-72 h-72 bg-black/5 dark:bg-white/5 rounded-full blur-3xl animate-float' />
        <div
          className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-black/3 dark:bg-white/3 rounded-full blur-3xl animate-float'
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className='container-premium relative z-10'>
        <div className='max-w-6xl mx-auto text-center space-y-8'>
          {/* Brand announcement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='inline-flex items-center space-x-2 px-4 py-2 bg-black/10 dark:bg-white/10 rounded-full border border-black/20 dark:border-white/20'
          >
            <span className='text-sm font-medium text-black dark:text-white'>
              Introducing the SARAS Engine
            </span>
            <ArrowRight className='w-4 h-4 text-gray-600 dark:text-white' />
          </motion.div>

          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='space-y-6'
          >
            <h1 className='text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-normal'>
              <span className='block text-black dark:text-white mb-2'>
                Where
              </span>
              <span className='block bg-gradient-to-r from-gray-800 to-black dark:from-gray-400 dark:to-gray-300 bg-clip-text text-transparent mb-2 pb-2'>
                Cutting-Edge AI
              </span>
              <span className='block text-black dark:text-white'>
                Meets Fitness
              </span>
            </h1>

            <p className='text-xl md:text-2xl text-gray-600 dark:text-white max-w-3xl mx-auto leading-relaxed'>
              Experience your personal AI fitness companion that knows you
              better than any human trainer could. Continuous adaptation.
              Intelligent personalization. Effortless optimization.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6'
          >
            <Button
              variant='primary'
              size='xl'
              className='group'
              icon={
                <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' />
              }
              iconPosition='right'
              onClick={() =>
                document
                  .getElementById('pricing')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Join SARAS
            </Button>

            <Button
              variant='ghost'
              size='xl'
              className='group'
              icon={
                <Play className='w-5 h-5 group-hover:scale-110 transition-transform duration-300' />
              }
            >
              Watch Demo
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
