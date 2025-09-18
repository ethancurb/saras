'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ForgotPasswordFormData {
  email: string;
}

interface FormErrors {
  email?: string;
  general?: string;
}

export default function ForgotPasswordForm() {
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (value: string) => {
    setFormData({ email: value });

    // Clear field error when user starts typing
    if (errors.email) {
      setErrors(prev => ({
        ...prev,
        email: undefined
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
      
      // TODO: Implement actual password reset logic
      console.log('Password reset request for:', formData.email);
      
      setIsEmailSent(true);
      
    } catch (error) {
      setErrors({
        general: 'Failed to send reset email. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEmailSent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className='border-0 shadow-xl bg-white/95 dark:bg-black/95 backdrop-blur-sm'>
          <CardContent className='text-center p-8'>
            <div className='w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4'>
              <Mail className='w-8 h-8 text-green-600 dark:text-green-400' />
            </div>
            
            <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
              Check Your Email
            </h3>
            
            <p className='text-gray-600 dark:text-gray-400 mb-6'>
              We've sent a password reset link to <strong>{formData.email}</strong>
            </p>
            
            <div className='space-y-3'>
              <Link href='/signin'>
                <Button variant='primary' size='md' className='w-full'>
                  Back to Sign In
                </Button>
              </Link>
              
              <button
                onClick={() => {
                  setIsEmailSent(false);
                  setFormData({ email: '' });
                }}
                className='w-full text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300'
              >
                Use a different email address
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className='border-0 shadow-xl bg-white/95 dark:bg-black/95 backdrop-blur-sm'>
        <CardHeader>
          <CardTitle className='flex items-center space-x-3'>
            <Mail className='w-6 h-6' />
            <span>Reset Password</span>
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
                  onChange={(e) => handleInputChange(e.target.value)}
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

            <div className='text-sm text-gray-600 dark:text-gray-400'>
              Enter your email address and we'll send you a link to reset your password.
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
              {isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </Button>

            {/* Back to Sign In Link */}
            <div className='text-center pt-4 border-t border-gray-200 dark:border-gray-700'>
              <Link 
                href='/signin'
                className='inline-flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-300'
              >
                <ArrowLeft className='w-4 h-4' />
                <span>Back to Sign In</span>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}