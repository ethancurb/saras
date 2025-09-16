/**
 * Tailwind CSS configuration for Saras luxury fitness application
 * Defines custom design tokens, colors, typography, and animations for premium aesthetic
 */

import type { Config } from 'tailwindcss';

const config: Config = {
  // Content paths for Tailwind to scan
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  
  // Enable dark mode support
  darkMode: ['class'],
  
  theme: {
    extend: {
      // Modern color palette - black on white with neutral accents
      colors: {
        // Brand colors
        brand: {
          primary: '#000000',      // Pure black for premium feel
          secondary: '#FFFFFF',    // Pure white for contrast
          accent: '#374151',       // Neutral gray accent
          'accent-light': '#6B7280',
          'accent-dark': '#1F2937',
        },
        
        // Grayscale palette for sophistication with dark mode support
        luxury: {
          black: '#000000',
          'black-soft': '#0A0A0A',
          'gray-dark': '#1A1A1A',
          'gray-medium': '#2A2A2A',
          'gray-light': '#3A3A3A',
          'gray-lighter': '#6B7280',
          'gray-subtle': '#9CA3AF',
          white: '#FFFFFF',
          'white-soft': '#FAFAFA',
          'off-white': '#F9F9F9',
        },
        
        // Dark mode colors
        dark: {
          background: '#0F0F0F',
          'background-secondary': '#1A1A1A',
          'background-tertiary': '#262626',
          text: '#FFFFFF',
          'text-secondary': '#D1D5DB',
          'text-tertiary': '#9CA3AF',
          border: '#374151',
          'border-light': '#4B5563',
        },
        
        // Semantic colors
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#6B7280',
        
        // Background variations
        background: {
          primary: '#FFFFFF',
          secondary: '#FAFAFA',
          tertiary: '#F5F5F5',
          dark: '#000000',
          'dark-soft': '#0A0A0A',
        },
        
        // Text color hierarchy with dark mode support
        text: {
          primary: '#000000',
          secondary: '#374151',
          tertiary: '#6B7280',
          inverse: '#FFFFFF',
          accent: '#2563EB',
        },
        
        // Border colors with dark mode support
        border: {
          primary: '#E5E7EB',
          secondary: '#D1D5DB',
          accent: '#2563EB',
          dark: '#374151',
        },
      },
      
      // Premium typography scale
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'sans-serif',
        ],
        serif: [
          'Playfair Display',
          'Georgia',
          'Times New Roman',
          'serif',
        ],
        mono: [
          'JetBrains Mono',
          'Monaco',
          'Cascadia Code',
          'Segoe UI Mono',
          'monospace',
        ],
      },
      
      // Refined font sizes for luxury feel
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      
      // Luxury spacing scale
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      
      // Refined border radius for modern feel
      borderRadius: {
        'xs': '0.125rem',
        'sm': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      
      // Box shadows for depth and luxury
      boxShadow: {
        'luxury-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'luxury': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'luxury-md': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'luxury-lg': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'luxury-xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'luxury-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'luxury-inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'accent': '0 4px 6px -1px rgba(37, 99, 235, 0.1), 0 2px 4px -1px rgba(37, 99, 235, 0.06)',
      },
      
      // Smooth animations for luxury feel
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
      },
      
      // Custom keyframes for animations
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(37, 99, 235, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(37, 99, 235, 0.6)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      
      // Custom backdrop blur for glassmorphism effects
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        '3xl': '40px',
      },
      
      // Custom gradients
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(135deg, #000000 0%, #1A1A1A 50%, #2A2A2A 100%)',
        'accent-gradient': 'linear-gradient(135deg, #2563EB 0%, #60A5FA 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        'dark-gradient': 'linear-gradient(135deg, #0F0F0F 0%, #1A1A1A 50%, #262626 100%)',
      },
    },
  },
  
  // Tailwind plugins
  plugins: [],
} satisfies Config;

export default config;