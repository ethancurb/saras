/**
 * Terms Confirmation Step Component
 *
 * Final step in the SARAS onboarding flow for reviewing terms and completing signup.
 * Features:
 * - Complete order summary and review
 * - Terms and conditions checkbox with link to full terms
 * - Privacy policy acknowledgment
 * - Final confirmation and account creation
 * - Loading states during submission
 * - Error handling and user feedback
 * - Previous navigation option
 * - Luxury design aesthetic matching SARAS brand
 * - Responsive layout for mobile and desktop
 * - Dark mode support
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Shield, FileText, Loader2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { OnboardingData } from '../onboarding-flow';

// Component props interface
interface TermsConfirmationStepProps {
  data: OnboardingData;
  termsAccepted: boolean;
  onUpdate: (termsAccepted: boolean) => void;
  onSubmit: () => Promise<void>;
  onPrevious: () => void;
  isSubmitting: boolean;
  submitError: string | null;
}

/**
 * Terms Confirmation Step Component
 *
 * Final step for reviewing order and accepting terms:
 * - Displays complete user information summary
 * - Shows subscription details and pricing
 * - Terms and conditions acceptance
 * - Final submission handling
 *
 * @param data - Complete onboarding form data
 * @param termsAccepted - Whether terms have been accepted
 * @param onUpdate - Callback to update terms acceptance
 * @param onSubmit - Callback to submit the complete form
 * @param onPrevious - Callback to go back to previous step
 * @param isSubmitting - Whether submission is in progress
 * @param submitError - Any error from submission attempt
 * @returns {JSX.Element} Terms confirmation and final submission step
 */
export function TermsConfirmationStep({
  data,
  termsAccepted,
  onUpdate,
  onSubmit,
  onPrevious,
  isSubmitting,
  submitError,
}: TermsConfirmationStepProps) {
  const [showTermsModal, setShowTermsModal] = useState(false);

  /**
   * Handle final form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!termsAccepted) {
      return;
    }

    await onSubmit();
  };

  /**
   * Mask card number for display
   */
  const maskCardNumber = (cardNumber: string): string => {
    const cleaned = cardNumber.replace(/\s/g, '');
    if (cleaned.length < 4) return cardNumber;
    return `•••• •••• •••• ${cleaned.slice(-4)}`;
  };

  return (
    <Card className='border-0 shadow-2xl bg-white/95 dark:bg-black/95 backdrop-blur-sm'>
      <CardContent className='p-8 md:p-12'>
        <div className='space-y-8'>
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='space-y-6'
          >
            <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
              Order Summary
            </h3>

            {/* Subscription Details */}
            <div className='bg-gray-50 dark:bg-gray-900 rounded-xl p-6 space-y-4'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                  <Star className='w-6 h-6 text-yellow-500' />
                  <div>
                    <h4 className='font-semibold text-gray-900 dark:text-white'>
                      SARAS Ultimate
                    </h4>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      Early Access Rate (locked forever)
                    </p>
                  </div>
                </div>
                <div className='text-right'>
                  <div className='text-2xl font-bold text-gray-900 dark:text-white'>
                    $9.99
                  </div>
                  <div className='text-sm text-gray-500 dark:text-gray-400 line-through'>
                    $29.99
                  </div>
                </div>
              </div>
              
              <div className='border-t border-gray-200 dark:border-gray-700 pt-4'>
                <div className='flex justify-between text-lg font-semibold text-gray-900 dark:text-white'>
                  <span>Total (monthly)</span>
                  <span>$9.99</span>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Personal Information */}
              <div className='space-y-3'>
                <h4 className='font-semibold text-gray-900 dark:text-white'>Account Information</h4>
                <div className='space-y-2 text-sm'>
                  <div>
                    <span className='text-gray-600 dark:text-gray-400'>Name: </span>
                    <span className='text-gray-900 dark:text-white'>
                      {data.personalInfo.firstName} {data.personalInfo.lastName}
                    </span>
                  </div>
                  <div>
                    <span className='text-gray-600 dark:text-gray-400'>Email: </span>
                    <span className='text-gray-900 dark:text-white'>
                      {data.personalInfo.email}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className='space-y-3'>
                <h4 className='font-semibold text-gray-900 dark:text-white'>Payment Method</h4>
                <div className='space-y-2 text-sm'>
                  <div>
                    <span className='text-gray-600 dark:text-gray-400'>Card: </span>
                    <span className='text-gray-900 dark:text-white'>
                      {maskCardNumber(data.paymentInfo.cardNumber)}
                    </span>
                  </div>
                  <div>
                    <span className='text-gray-600 dark:text-gray-400'>Expires: </span>
                    <span className='text-gray-900 dark:text-white'>
                      {data.paymentInfo.expiryDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Billing Address */}
            <div className='space-y-3'>
              <h4 className='font-semibold text-gray-900 dark:text-white'>Billing Address</h4>
              <div className='text-sm text-gray-600 dark:text-gray-400'>
                <div>{data.billingAddress.addressLine1}</div>
                {data.billingAddress.addressLine2 && (
                  <div>{data.billingAddress.addressLine2}</div>
                )}
                <div>
                  {data.billingAddress.city}, {data.billingAddress.state} {data.billingAddress.zipCode}
                </div>
                <div>{data.billingAddress.country}</div>
              </div>
            </div>
          </motion.div>

          {/* Terms and Conditions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='space-y-6'
          >
            <div className='border-t border-gray-200 dark:border-gray-700 pt-8'>
              <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-6'>
                Terms & Conditions
              </h3>

              {/* Terms Acceptance */}
              <div className='space-y-4'>
                <label className='flex items-start space-x-4 cursor-pointer group'>
                  <div className='relative'>
                    <input
                      type='checkbox'
                      checked={termsAccepted}
                      onChange={(e) => onUpdate(e.target.checked)}
                      className='sr-only'
                    />
                    <div
                      className={`
                        w-6 h-6 rounded border-2 transition-all duration-300 flex items-center justify-center
                        ${termsAccepted
                          ? 'bg-black dark:bg-white border-black dark:border-white'
                          : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 group-hover:border-gray-400 dark:group-hover:border-gray-500'
                        }
                      `}
                    >
                      {termsAccepted && (
                        <Check className='w-4 h-4 text-white dark:text-black' />
                      )}
                    </div>
                  </div>
                  <div className='flex-1 text-sm text-gray-600 dark:text-gray-400 leading-relaxed'>
                    I agree to the{' '}
                    <button
                      type='button'
                      onClick={() => setShowTermsModal(true)}
                      className='text-black dark:text-white underline hover:no-underline font-medium'
                    >
                      Terms of Service
                    </button>
                    {' '}and{' '}
                    <button
                      type='button'
                      onClick={() => setShowTermsModal(true)}
                      className='text-black dark:text-white underline hover:no-underline font-medium'
                    >
                      Privacy Policy
                    </button>
                    . I understand that my subscription will automatically renew monthly at $9.99 unless I cancel.
                  </div>
                </label>

                {/* Additional Terms */}
                <div className='pl-10 space-y-2 text-sm text-gray-500 dark:text-gray-400'>
                  <div className='flex items-center space-x-2'>
                    <Shield className='w-4 h-4 text-green-500' />
                    <span>Cancel anytime, no hidden fees</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Shield className='w-4 h-4 text-green-500' />
                    <span>Your early access rate is locked forever</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Shield className='w-4 h-4 text-green-500' />
                    <span>Secure payment processing with industry-standard encryption</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Error Message */}
          {submitError && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4'
            >
              <p className='text-red-700 dark:text-red-400 text-sm'>{submitError}</p>
            </motion.div>
          )}

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
              disabled={isSubmitting}
              className='group order-2 sm:order-1'
              icon={
                <ArrowLeft className='w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300' />
              }
            >
              Previous
            </Button>
            <Button
              type='button'
              variant='primary'
              size='xl'
              onClick={handleSubmit}
              disabled={!termsAccepted || isSubmitting}
              className='w-full sm:flex-1 group order-1 sm:order-2'
              icon={
                isSubmitting ? (
                  <Loader2 className='w-5 h-5 animate-spin' />
                ) : (
                  <Check className='w-5 h-5 group-hover:scale-110 transition-transform duration-300' />
                )
              }
              iconPosition='right'
            >
              {isSubmitting ? 'Creating Account...' : 'Complete Signup'}
            </Button>
          </motion.div>
        </div>
      </CardContent>

      {/* Terms Modal (placeholder for now) */}
      {showTermsModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'
          onClick={() => setShowTermsModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className='bg-white dark:bg-gray-900 rounded-xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex items-center space-x-3 mb-6'>
              <FileText className='w-6 h-6' />
              <h3 className='text-xl font-bold'>Terms of Service & Privacy Policy</h3>
            </div>
            <div className='space-y-4 text-sm text-gray-600 dark:text-gray-400'>
              <p>
                <strong>Terms of Service:</strong> By using SARAS, you agree to our premium AI fitness service terms...
              </p>
              <p>
                <strong>Privacy Policy:</strong> We protect your personal information and health data with industry-leading security...
              </p>
              <p>
                <strong>Subscription Terms:</strong> Your subscription automatically renews monthly. Cancel anytime through your account settings...
              </p>
            </div>
            <div className='mt-8 flex justify-end'>
              <Button
                variant='primary'
                onClick={() => setShowTermsModal(false)}
              >
                Close
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </Card>
  );
}