'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="
        relative p-2 rounded-lg
        bg-white dark:bg-dark-background-secondary
        border border-border-primary dark:border-dark-border
        text-text-secondary dark:text-dark-text-secondary
        hover:bg-black/10 dark:hover:bg-white/10
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-brand-accent
      "
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        initial={{ opacity: 0, rotate: -90 }}
        animate={{ 
          opacity: 1, 
          rotate: 0,
          scale: theme === 'light' ? 1 : 0.8
        }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        {theme === 'light' ? (
          <Moon className="w-5 h-5" />
        ) : (
          <Sun className="w-5 h-5" />
        )}
      </motion.div>
    </motion.button>
  );
}