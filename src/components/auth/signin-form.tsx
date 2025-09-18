'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface SignInFormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function SignInForm() {
  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof SignInFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // TODO: Implement actual sign-in logic
      console.log('Sign in attempt:', formData);
      
      // For now, show success (in real app, redirect to dashboard)
      alert('Sign in successful! (Demo)');
      
    } catch (error) {
      setErrors({
        general: 'Sign in failed. Please check your credentials and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className='border-0 shadow-xl bg-white/95 dark:bg-black/95 backdrop-blur-sm'>
        <CardHeader>
          <CardTitle className='flex items-center space-x-3'>
            <Lock className='w-6 h-6' />
            <span>Sign In</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* General Error */}
            {errors.general && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className='p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
              >
                <p className='text-sm text-red-600 dark:text-red-400'>{errors.general}</p>
              </motion.div>
            )}

            {/* Email */}
            <div className='space-y-2'>
              <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                Email Address
              </label>
              <div className='relative'>
                <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500' />
                <input
                  type='email'
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`
                    w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-300
                    bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                    placeholder-gray-400 dark:placeholder-gray-500
                    focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20
                    ${errors.email 
                      ? 'border-red-500 dark:border-red-400' 
                      : 'border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white'
                    }
                  `}
                  placeholder='Enter your email address'
                  autoComplete='email'
                />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='text-sm text-red-500 dark:text-red-400'
                >
                  {errors.email}
                </motion.p>
              )}
            </div>

            {/* Password */}
            <div className='space-y-2'>
              <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                Password
              </label>
              <div className='relative'>
                <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500' />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`
                    w-full pl-12 pr-12 py-3 rounded-xl border-2 transition-all duration-300
                    bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                    placeholder-gray-400 dark:placeholder-gray-500
                    focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20
                    ${errors.password 
                      ? 'border-red-500 dark:border-red-400' 
                      : 'border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white'
                    }
                  `}
                  placeholder='Enter your password'
                  autoComplete='current-password'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors'
                >
                  {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='text-sm text-red-500 dark:text-red-400'
                >
                  {errors.password}
                </motion.p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className='flex justify-end'>
              <Link 
                href='/forgot-password'
                className='text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300'
              >
                Forgot your password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type='submit'
              variant='primary'
              size='xl'
              disabled={isSubmitting}
              className='w-full group'
              icon={
                isSubmitting ? (
                  <Loader2 className='w-5 h-5 animate-spin' />
                ) : (
                  <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' />
                )
              }
              iconPosition='right'
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </Button>

            {/* Sign Up Link */}
            <div className='text-center pt-4 border-t border-gray-200 dark:border-gray-700'>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                Don't have an account?{' '}
                <Link 
                  href='/#pricing'
                  className='font-semibold text-black dark:text-white hover:underline transition-all duration-300'
                >
                  Sign up now
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}