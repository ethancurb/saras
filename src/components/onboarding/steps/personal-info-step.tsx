/**
 * Personal Information Step Component
 *
 * First step in the SARAS onboarding flow for collecting user's basic information.
 * Features:
 * - First name and last name input fields
 * - Email address input with validation
 * - Real-time form validation and error feedback
 * - Luxury design aesthetic matching SARAS brand
 * - Responsive layout for mobile and desktop
 * - Dark mode support
 * - Smooth animations and micro-interactions
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, User, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Personal information data interface
interface PersonalInfoData {
  firstName: string;
  lastName: string;
  email: string;
}

// Component props interface
interface PersonalInfoStepProps {
  data: PersonalInfoData;
  onUpdate: (data: PersonalInfoData) => void;
  onNext: () => void;
}

/**
 * Personal Information Step Component
 *
 * Collects and validates user's basic personal information:
 * - First and last name with proper formatting
 * - Email address with format validation
 * - Real-time validation feedback
 * - Smooth form interactions
 *
 * @param data - Current form data
 * @param onUpdate - Callback to update form data
 * @param onNext - Callback to proceed to next step
 * @returns {JSX.Element} Personal information form step
 */
export function PersonalInfoStep({ data, onUpdate, onNext }: PersonalInfoStepProps) {
  // Form validation state
  const [errors, setErrors] = useState<Partial<PersonalInfoData>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof PersonalInfoData, boolean>>>({});

  /**
   * Validate individual field
   */
  const validateField = (field: keyof PersonalInfoData, value: string): string | null => {
    switch (field) {
      case 'firstName':
        if (!value.trim()) return 'First name is required';
        if (value.trim().length < 2) return 'First name must be at least 2 characters';
        return null;
      case 'lastName':
        if (!value.trim()) return 'Last name is required';
        if (value.trim().length < 2) return 'Last name must be at least 2 characters';
        return null;
      case 'email':
        if (!value.trim()) return 'Email address is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return null;
      default:
        return null;
    }
  };

  /**
   * Validate entire form
   */
  const validateForm = (): boolean => {
    const newErrors: Partial<PersonalInfoData> = {};
    let isValid = true;

    (Object.keys(data) as Array<keyof PersonalInfoData>).forEach(field => {
      const error = validateField(field, data[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  /**
   * Handle input change with validation
   */
  const handleInputChange = (field: keyof PersonalInfoData, value: string) => {
    // Update form data
    onUpdate({ ...data, [field]: value });

    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }

    // Validate field if it has been touched
    if (touched[field]) {
      const error = validateField(field, value);
      if (error) {
        setErrors(prev => ({ ...prev, [field]: error }));
      }
    }
  };

  /**
   * Handle field blur (mark as touched and validate)
   */
  const handleFieldBlur = (field: keyof PersonalInfoData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, data[field]);
    if (error) {
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
    });

    // Validate form
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <Card className='border-0 shadow-2xl bg-white/95 dark:bg-black/95 backdrop-blur-sm'>
      <CardContent className='p-8 md:p-12'>
        <form onSubmit={handleSubmit} className='space-y-8'>
          {/* Name Fields Row */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* First Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className='space-y-2'
            >
              <label htmlFor='firstName' className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                First Name
              </label>
              <div className='relative'>
                <User className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500' />
                <input
                  id='firstName'
                  type='text'
                  value={data.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  onBlur={() => handleFieldBlur('firstName')}
                  className={`
                    w-full pl-12 pr-4 py-4 rounded-xl border-2 transition-all duration-300
                    bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                    placeholder-gray-400 dark:placeholder-gray-500
                    focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20
                    ${errors.firstName 
                      ? 'border-red-500 dark:border-red-400' 
                      : 'border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white'
                    }
                  `}
                  placeholder='Enter your first name'
                />
              </div>
              {errors.firstName && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='text-sm text-red-500 dark:text-red-400'
                >
                  {errors.firstName}
                </motion.p>
              )}
            </motion.div>

            {/* Last Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='space-y-2'
            >
              <label htmlFor='lastName' className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                Last Name
              </label>
              <div className='relative'>
                <User className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500' />
                <input
                  id='lastName'
                  type='text'
                  value={data.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  onBlur={() => handleFieldBlur('lastName')}
                  className={`
                    w-full pl-12 pr-4 py-4 rounded-xl border-2 transition-all duration-300
                    bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                    placeholder-gray-400 dark:placeholder-gray-500
                    focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20
                    ${errors.lastName 
                      ? 'border-red-500 dark:border-red-400' 
                      : 'border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white'
                    }
                  `}
                  placeholder='Enter your last name'
                />
              </div>
              {errors.lastName && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='text-sm text-red-500 dark:text-red-400'
                >
                  {errors.lastName}
                </motion.p>
              )}
            </motion.div>
          </div>

          {/* Email Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='space-y-2'
          >
            <label htmlFor='email' className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
              Email Address
            </label>
            <div className='relative'>
              <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500' />
              <input
                id='email'
                type='email'
                value={data.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onBlur={() => handleFieldBlur('email')}
                className={`
                  w-full pl-12 pr-4 py-4 rounded-xl border-2 transition-all duration-300
                  bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                  placeholder-gray-400 dark:placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20
                  ${errors.email 
                    ? 'border-red-500 dark:border-red-400' 
                    : 'border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white'
                  }
                `}
                placeholder='Enter your email address'
              />
            </div>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-sm text-red-500 dark:text-red-400'
              >
                {errors.email}
              </motion.p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='pt-6'
          >
            <Button
              type='submit'
              variant='primary'
              size='xl'
              className='w-full group'
              icon={
                <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' />
              }
              iconPosition='right'
            >
              Continue
            </Button>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  );
}