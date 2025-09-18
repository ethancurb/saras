/**
 * Luxury Header Component for SARAS Fitness Application
 * Provides elegant navigation with sophisticated styling and smooth interactions
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import type { NavigationItem } from '@/types';

// Navigation items configuration - ordered by user journey flow
const navigationItems: NavigationItem[] = [
  {
    label: 'Overview',
    href: '#overview',
    description: 'Introduction to SARAS AI Fitness',
  },
  {
    label: 'Features',
    href: '#features',
    description: 'Discover AI-powered personalization',
  },
  {
    label: 'Pricing',
    href: '#pricing',
    description: 'Choose your fitness journey',
  },
];

/**
 * Main Header Component
 * Features responsive design, smooth scrolling effects, and luxury styling
 */
export function Header() {
  // State management for mobile menu and scroll effects
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effects for header backdrop
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out',
        isScrolled
          ? 'bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-gray-200 dark:border-white/20 shadow-lg'
          : 'bg-white/80 dark:bg-black/80 backdrop-blur-sm'
      )}
    >
      <div className='container-premium'>
        <nav className='flex items-center justify-between h-24 py-4'>
          {/* Logo and Brand */}
          <div className='flex items-center'>
            <Link
              href='/'
              className='group flex items-center space-x-3 transition-all duration-300'
            >
              {/* SARAS Logo - using your PNG files - even larger size */}
              <div className='relative h-14 w-56 transition-all duration-300 group-hover:scale-105'>
                {/* Light mode logo (black text on white background) */}
                <Image
                  src='/logo light.png?v=2'
                  alt='SARAS Logo'
                  fill
                  className='object-contain dark:hidden'
                  priority
                />
                {/* Dark mode logo (white text on black background) */}
                <Image
                  src='/logo dark.png?v=2'
                  alt='SARAS Logo'
                  fill
                  className='object-contain hidden dark:block'
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-8'>
            {navigationItems.map(item => (
              <NavLink key={item.href} {...item} />
            ))}
          </div>

          {/* CTA Buttons and Theme Toggle */}
          <div className='hidden md:flex items-center space-x-4'>
            <ThemeToggle />
            <Link href='/signin'>
              <Button variant='ghost' size='sm'>
                Sign In
              </Button>
            </Link>
            <Button
              variant='accent'
              size='sm'
              onClick={() =>
                document
                  .getElementById('pricing')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Join SARAS
            </Button>
          </div>

          {/* Mobile Menu Toggle and Theme Toggle */}
          <div className='md:hidden flex items-center space-x-2'>
            <ThemeToggle />
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label='Toggle mobile menu'
            >
              {isMobileMenuOpen ? (
                <X className='h-6 w-6' />
              ) : (
                <Menu className='h-6 w-6' />
              )}
            </Button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='md:hidden bg-white/98 dark:bg-black/98 backdrop-blur-lg border-t border-gray-200 dark:border-white/20'
          >
            <div className='container-premium py-6'>
              {/* Mobile Navigation Links */}
              <div className='space-y-4 mb-6'>
                {navigationItems.map(item => (
                  <MobileNavLink
                    key={item.href}
                    {...item}
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                ))}
              </div>

              {/* Mobile CTA Buttons */}
              <div className='flex flex-col space-y-3'>
                <Link href='/signin'>
                  <Button variant='ghost' size='md' className='w-full'>
                    Sign In
                  </Button>
                </Link>
                <Button
                  variant='accent'
                  size='md'
                  className='w-full'
                  onClick={() =>
                    document
                      .getElementById('pricing')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                >
                  Join SARAS
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/**
 * Desktop Navigation Link Component
 * Features hover effects and smooth transitions
 */
function NavLink({ label, href, description }: NavigationItem) {
  return (
    <Link
      href={href}
      className='group relative py-2 text-black dark:text-white hover:text-gray-600 dark:hover:text-white transition-colors duration-300'
    >
      <span className='text-sm font-medium'>{label}</span>

      {/* Hover underline effect */}
      <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-black dark:bg-white group-hover:w-full transition-all duration-300 ease-out' />

      {/* Tooltip on hover */}
      {description && (
        <div className='absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-black dark:bg-white text-white dark:text-black text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap'>
          {description}
          <div className='absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black dark:bg-white rotate-45' />
        </div>
      )}
    </Link>
  );
}

/**
 * Mobile Navigation Link Component
 * Optimized for touch interactions
 */
function MobileNavLink({
  label,
  href,
  description,
  onClick,
}: NavigationItem & { onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className='block py-3 px-4 rounded-lg text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300'
    >
      <div className='font-medium'>{label}</div>
      {description && (
        <div className='text-sm text-gray-500 dark:text-white mt-1'>
          {description}
        </div>
      )}
    </Link>
  );
}
