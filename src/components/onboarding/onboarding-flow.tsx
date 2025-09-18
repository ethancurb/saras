/**
 * SARAS Onboarding Flow Component
 *
 * Main orchestrator for the premium user registration experience.
 * Features:
 * - Multi-step form progression with validation
 * - Progress tracking and visual indicators
 * - Step-by-step data collection and validation
 * - Smooth transitions between steps
 * - Error handling and user feedback
 * - Mobile-responsive design
 * - Dark mode support
 * - Luxury design aesthetic consistent with SARAS brand
 */

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProgressIndicator } from '@/components/onboarding/progress-indicator';
import { PersonalInfoStep } from '@/components/onboarding/steps/personal-info-step';
import { AccountSetupStep } from '@/components/onboarding/steps/account-setup-step';
import { BillingAddressStep } from '@/components/onboarding/steps/billing-address-step';
import { PaymentInfoStep } from '@/components/onboarding/steps/payment-info-step';
import { TermsConfirmationStep } from '@/components/onboarding/steps/terms-confirmation-step';

// Onboarding step configuration
// Defines the flow sequence, step names, and validation requirements
const ONBOARDING_STEPS = [
  {
    id: 'personal-info',
    title: 'Personal Information',
    description: 'Tell us about yourself',
  },
  {
    id: 'account-setup',
    title: 'Account Setup',
    description: 'Create your secure account',
  },
  {
    id: 'billing-address',
    title: 'Billing Address',
    description: 'Where should we send your invoice?',
  },
  {
    id: 'payment-info',
    title: 'Payment Information',
    description: 'Secure payment details',
  },
  {
    id: 'terms-confirmation',
    title: 'Terms & Confirmation',
    description: 'Review and confirm your membership',
  },
] as const;

// Type definitions for form data structure
export interface OnboardingData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
  };
  accountSetup: {
    password: string;
    confirmPassword: string;
  };
  billingAddress: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentInfo: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardholderName: string;
  };
  termsAccepted: boolean;
}

/**
 * Main Onboarding Flow Component
 *
 * Manages the complete onboarding experience:
 * - Step progression and navigation
 * - Form data collection and validation
 * - Progress tracking and visual feedback
 * - Error handling and user guidance
 * - Final submission and account creation
 *
 * @returns {JSX.Element} Complete onboarding flow interface
 */
export function OnboardingFlow() {
  // Current step index (0-based)
  const [currentStep, setCurrentStep] = useState(0);
  
  // Form data storage
  const [formData, setFormData] = useState<OnboardingData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
    },
    accountSetup: {
      password: '',
      confirmPassword: '',
    },
    billingAddress: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
    },
    paymentInfo: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
    },
    termsAccepted: false,
  });

  // Loading and error states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  /**
   * Navigate to next step if current step is valid
   */
  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  /**
   * Navigate to previous step
   */
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  /**
   * Update form data for specific step
   */
  const updateFormData = (stepData: Partial<OnboardingData>) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  /**
   * Handle final form submission
   */
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // TODO: Implement actual API call to create account and process payment
      console.log('Submitting onboarding data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // TODO: Redirect to success page or dashboard
      alert('Account created successfully! Welcome to SARAS Ultimate.');
      
    } catch (error) {
      setSubmitError('An error occurred while creating your account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Render current step component
   */
  const renderCurrentStep = () => {
    const stepId = ONBOARDING_STEPS[currentStep].id;

    switch (stepId) {
      case 'personal-info':
        return (
          <PersonalInfoStep
            data={formData.personalInfo}
            onUpdate={(data: typeof formData.personalInfo) => updateFormData({ personalInfo: data })}
            onNext={handleNext}
          />
        );
      case 'account-setup':
        return (
          <AccountSetupStep
            data={formData.accountSetup}
            onUpdate={(data: typeof formData.accountSetup) => updateFormData({ accountSetup: data })}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 'billing-address':
        return (
          <BillingAddressStep
            data={formData.billingAddress}
            onUpdate={(data: typeof formData.billingAddress) => updateFormData({ billingAddress: data })}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 'payment-info':
        return (
          <PaymentInfoStep
            data={formData.paymentInfo}
            onUpdate={(data: typeof formData.paymentInfo) => updateFormData({ paymentInfo: data })}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 'terms-confirmation':
        return (
          <TermsConfirmationStep
            data={formData}
            termsAccepted={formData.termsAccepted}
            onUpdate={(termsAccepted: boolean) => updateFormData({ termsAccepted })}
            onSubmit={handleSubmit}
            onPrevious={handlePrevious}
            isSubmitting={isSubmitting}
            submitError={submitError}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-white via-gray-50 to-white dark:from-dark-background dark:via-dark-background-secondary dark:to-dark-background'>
      <div className='container-premium'>
        <div className='min-h-screen flex flex-col'>
          {/* Header */}
          <header className='py-8'>
            <div className='flex items-center justify-between'>
              {/* SARAS Logo */}
              <div className='text-2xl font-bold text-black dark:text-white'>
                SARAS
              </div>

              {/* Progress Indicator */}
              <ProgressIndicator
                steps={ONBOARDING_STEPS}
                currentStep={currentStep}
              />

              {/* Step Counter */}
              <div className='text-sm text-gray-600 dark:text-gray-400'>
                Step {currentStep + 1} of {ONBOARDING_STEPS.length}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className='flex-1 flex items-center justify-center py-8'>
            <div className='w-full max-w-2xl'>
              {/* Step Header */}
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='text-center mb-12'
              >
                <h1 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
                  {ONBOARDING_STEPS[currentStep].title}
                </h1>
                <p className='text-lg text-gray-600 dark:text-gray-400'>
                  {ONBOARDING_STEPS[currentStep].description}
                </p>
              </motion.div>

              {/* Step Content */}
              <AnimatePresence mode='wait'>
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderCurrentStep()}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}