/**
 * Account Setup Step Component
 *
 * Second step in the SARAS onboarding flow for creating secure user account.
 * Features:
 * - Password creation with strength validation
 * - Password confirmation matching
 * - Real-time password strength indicator
 * - Security requirements display
 * - Previous/Next navigation
 * - Luxury design aesthetic matching SARAS brand
 * - Responsive layout for mobile and desktop
 * - Dark mode support
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Lock, Eye, EyeOff, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Account setup data interface
interface AccountSetupData {
  password: string;
  confirmPassword: string;
}

// Component props interface
interface AccountSetupStepProps {
  data: AccountSetupData;
  onUpdate: (data: AccountSetupData) => void;
  onNext: () => void;
  onPrevious: () => void;
}

// Password strength criteria
const PASSWORD_CRITERIA = [
  { id: 'length', label: 'At least 8 characters', test: (pwd: string) => pwd.length >= 8 },
  { id: 'uppercase', label: 'One uppercase letter', test: (pwd: string) => /[A-Z]/.test(pwd) },
  { id: 'lowercase', label: 'One lowercase letter', test: (pwd: string) => /[a-z]/.test(pwd) },
  { id: 'number', label: 'One number', test: (pwd: string) => /\d/.test(pwd) },
  { id: 'special', label: 'One special character', test: (pwd: string) => /[!@#$%^&*(),.?\":{}|<>]/.test(pwd) },
];

/**
 * Account Setup Step Component
 *
 * Handles secure password creation with validation:
 * - Password strength checking against security criteria
 * - Password confirmation matching validation
 * - Visual feedback for password requirements
 * - Show/hide password toggle functionality
 *
 * @param data - Current form data
 * @param onUpdate - Callback to update form data
 * @param onNext - Callback to proceed to next step
 * @param onPrevious - Callback to go back to previous step
 * @returns {JSX.Element} Account setup form step
 */
export function AccountSetupStep({ data, onUpdate, onNext, onPrevious }: AccountSetupStepProps) {
  // Form validation and UI state
  const [errors, setErrors] = useState<Partial<AccountSetupData>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof AccountSetupData, boolean>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /**
   * Calculate password strength score
   */
  const getPasswordStrength = (password: string): number => {
    if (!password) return 0;
    const metCriteria = PASSWORD_CRITERIA.filter(criteria => criteria.test(password));
    return metCriteria.length;
  };

  /**
   * Get password strength label and color
   */
  const getPasswordStrengthDisplay = (score: number) => {
    if (score <= 1) return { label: 'Weak', color: 'text-red-500', bgColor: 'bg-red-500' };
    if (score <= 3) return { label: 'Fair', color: 'text-yellow-500', bgColor: 'bg-yellow-500' };
    if (score <= 4) return { label: 'Good', color: 'text-blue-500', bgColor: 'bg-blue-500' };
    return { label: 'Strong', color: 'text-green-500', bgColor: 'bg-green-500' };
  };

  /**
   * Validate form fields
   */
  const validateForm = (): boolean => {
    const newErrors: Partial<AccountSetupData> = {};
    let isValid = true;

    // Validate password
    if (!data.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (getPasswordStrength(data.password) < 5) {
      newErrors.password = 'Password must meet all security requirements';
      isValid = false;
    }

    // Validate password confirmation
    if (!data.confirmPassword) {
      newErrors.confirmPassword = 'Password confirmation is required';
      isValid = false;
    } else if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  /**
   * Handle input change with validation
   */
  const handleInputChange = (field: keyof AccountSetupData, value: string) => {
    // Update form data
    onUpdate({ ...data, [field]: value });

    // Clear errors for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }

    // Re-validate confirm password if password changes
    if (field === 'password' && data.confirmPassword && touched.confirmPassword) {
      if (value !== data.confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      } else {
        setErrors(prev => ({ ...prev, confirmPassword: undefined }));
      }
    }
  };

  /**
   * Handle field blur (mark as touched and validate)
   */
  const handleFieldBlur = (field: keyof AccountSetupData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    if (field === 'confirmPassword' && data.password !== data.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      password: true,
      confirmPassword: true,
    });

    // Validate form
    if (validateForm()) {
      onNext();
    }
  };

  const passwordStrength = getPasswordStrength(data.password);
  const strengthDisplay = getPasswordStrengthDisplay(passwordStrength);

  return (
    <Card className='border-0 shadow-2xl bg-white/95 dark:bg-black/95 backdrop-blur-sm'>
      <CardContent className='p-8 md:p-12'>
        <form onSubmit={handleSubmit} className='space-y-8'>
          {/* Password Field */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='space-y-4'
          >
            <label htmlFor='password' className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
              Create Password
            </label>
            <div className='relative'>
              <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500' />
              <input
                id='password'
                type={showPassword ? 'text' : 'password'}
                value={data.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                onBlur={() => handleFieldBlur('password')}
                className={`
                  w-full pl-12 pr-12 py-4 rounded-xl border-2 transition-all duration-300
                  bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                  placeholder-gray-400 dark:placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20
                  ${errors.password 
                    ? 'border-red-500 dark:border-red-400' 
                    : 'border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white'
                  }
                `}
                placeholder='Create a strong password'
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
              >
                {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {data.password && (
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-gray-600 dark:text-gray-400'>Password Strength</span>
                  <span className={`text-sm font-medium ${strengthDisplay.color}`}>
                    {strengthDisplay.label}
                  </span>
                </div>
                <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${strengthDisplay.bgColor}`}
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Password Requirements */}
            {data.password && (
              <div className='space-y-2'>
                <p className='text-sm font-medium text-gray-700 dark:text-gray-300'>Password Requirements:</p>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                  {PASSWORD_CRITERIA.map((criteria) => {
                    const isMet = criteria.test(data.password);
                    return (
                      <div key={criteria.id} className='flex items-center space-x-2'>
                        {isMet ? (
                          <Check className='w-4 h-4 text-green-500' />
                        ) : (
                          <X className='w-4 h-4 text-gray-400' />
                        )}
                        <span className={`text-sm ${isMet ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                          {criteria.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {errors.password && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-sm text-red-500 dark:text-red-400'
              >
                {errors.password}
              </motion.p>
            )}
          </motion.div>

          {/* Confirm Password Field */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='space-y-2'
          >
            <label htmlFor='confirmPassword' className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
              Confirm Password
            </label>
            <div className='relative'>
              <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500' />
              <input
                id='confirmPassword'
                type={showConfirmPassword ? 'text' : 'password'}
                value={data.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                onBlur={() => handleFieldBlur('confirmPassword')}
                className={`
                  w-full pl-12 pr-12 py-4 rounded-xl border-2 transition-all duration-300
                  bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                  placeholder-gray-400 dark:placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20
                  ${errors.confirmPassword 
                    ? 'border-red-500 dark:border-red-400' 
                    : 'border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white'
                  }
                `}
                placeholder='Re-enter your password'
              />
              <button
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
              >
                {showConfirmPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
              </button>
            </div>
            {errors.confirmPassword && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-sm text-red-500 dark:text-red-400'
              >
                {errors.confirmPassword}
              </motion.p>
            )}
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='flex flex-col sm:flex-row gap-4 pt-6'
          >
            <Button
              type='button'
              variant='ghost'
              size='xl'
              onClick={onPrevious}
              className='group order-2 sm:order-1'
              icon={
                <ArrowLeft className='w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300' />
              }
            >
              Previous
            </Button>
            <Button
              type='submit'
              variant='primary'
              size='xl'
              className='w-full sm:flex-1 group order-1 sm:order-2'
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