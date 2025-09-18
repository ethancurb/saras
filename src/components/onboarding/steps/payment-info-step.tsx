/**
 * Payment Information Step Component
 *
 * Fourth step in the SARAS onboarding flow for collecting secure payment details.
 * Features:
 * - Credit card number input with formatting and validation
 * - Expiry date input with MM/YY format
 * - CVV input with security guidelines
 * - Cardholder name field
 * - Real-time card type detection and validation
 * - Secure payment processing indicators
 * - Previous/Next navigation
 * - Luxury design aesthetic matching SARAS brand
 * - Responsive layout for mobile and desktop
 * - Dark mode support
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, CreditCard, Shield, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Payment information data interface
interface PaymentInfoData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

// Component props interface
interface PaymentInfoStepProps {
  data: PaymentInfoData;
  onUpdate: (data: PaymentInfoData) => void;
  onNext: () => void;
  onPrevious: () => void;
}

// Card type detection patterns
const CARD_PATTERNS = {
  visa: /^4/,
  mastercard: /^5[1-5]|^2[2-7]/,
  amex: /^3[47]/,
  discover: /^6(?:011|5)/,
};

/**
 * Payment Information Step Component
 *
 * Handles secure collection of payment details:
 * - Credit card information with real-time validation
 * - Card type detection and formatting
 * - Security features and indicators
 * - PCI compliance considerations
 *
 * @param data - Current form data
 * @param onUpdate - Callback to update form data
 * @param onNext - Callback to proceed to next step
 * @param onPrevious - Callback to go back to previous step
 * @returns {JSX.Element} Payment information form step
 */
export function PaymentInfoStep({ data, onUpdate, onNext, onPrevious }: PaymentInfoStepProps) {
  // Form validation state
  const [errors, setErrors] = useState<Partial<PaymentInfoData>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof PaymentInfoData, boolean>>>({});

  /**
   * Detect card type from card number
   */
  const detectCardType = (cardNumber: string): string | null => {
    const cleanNumber = cardNumber.replace(/\s/g, '');
    for (const [type, pattern] of Object.entries(CARD_PATTERNS)) {
      if (pattern.test(cleanNumber)) {
        return type;
      }
    }
    return null;
  };

  /**
   * Format card number with spaces
   */
  const formatCardNumber = (value: string): string => {
    const cleanValue = value.replace(/\s/g, '').replace(/[^0-9]/g, '');
    const chunks = cleanValue.match(/.{1,4}/g) || [];
    return chunks.join(' ').substr(0, 19); // Max 16 digits + 3 spaces
  };

  /**
   * Format expiry date as MM/YY
   */
  const formatExpiryDate = (value: string): string => {
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length >= 2) {
      return cleanValue.substr(0, 2) + '/' + cleanValue.substr(2, 2);
    }
    return cleanValue;
  };

  /**
   * Validate Luhn algorithm for card number
   */
  const isValidCardNumber = (cardNumber: string): boolean => {
    const cleanNumber = cardNumber.replace(/\s/g, '');
    if (!/^\d+$/.test(cleanNumber) || cleanNumber.length < 13 || cleanNumber.length > 19) {
      return false;
    }

    let sum = 0;
    let shouldDouble = false;

    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber.charAt(i), 10);

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return (sum % 10) === 0;
  };

  /**
   * Validate individual field
   */
  const validateField = (field: keyof PaymentInfoData, value: string): string | null => {
    switch (field) {
      case 'cardNumber':
        if (!value.trim()) return 'Card number is required';
        if (!isValidCardNumber(value)) return 'Please enter a valid card number';
        return null;
      case 'expiryDate':
        if (!value.trim()) return 'Expiry date is required';
        if (!/^\d{2}\/\d{2}$/.test(value)) return 'Please enter date as MM/YY';
        const [month, year] = value.split('/');
        const now = new Date();
        const currentYear = now.getFullYear() % 100;
        const currentMonth = now.getMonth() + 1;
        if (parseInt(month) < 1 || parseInt(month) > 12) return 'Invalid month';
        if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
          return 'Card has expired';
        }
        return null;
      case 'cvv':
        if (!value.trim()) return 'CVV is required';
        if (!/^\d{3,4}$/.test(value)) return 'CVV must be 3 or 4 digits';
        return null;
      case 'cardholderName':
        if (!value.trim()) return 'Cardholder name is required';
        if (value.trim().length < 2) return 'Please enter the full name on the card';
        return null;
      default:
        return null;
    }
  };

  /**
   * Validate entire form
   */
  const validateForm = (): boolean => {
    const newErrors: Partial<PaymentInfoData> = {};
    let isValid = true;

    (Object.keys(data) as Array<keyof PaymentInfoData>).forEach(field => {
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
  const handleInputChange = (field: keyof PaymentInfoData, value: string) => {
    let formattedValue = value;

    // Apply formatting based on field
    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substr(0, 4);
    }

    // Update form data
    onUpdate({ ...data, [field]: formattedValue });

    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }

    // Validate field if it has been touched
    if (touched[field]) {
      const error = validateField(field, formattedValue);
      if (error) {
        setErrors(prev => ({ ...prev, [field]: error }));
      }
    }
  };

  /**
   * Handle field blur (mark as touched and validate)
   */
  const handleFieldBlur = (field: keyof PaymentInfoData) => {
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
      cardNumber: true,
      expiryDate: true,
      cvv: true,
      cardholderName: true,
    });

    // Validate form
    if (validateForm()) {
      onNext();
    }
  };

  const cardType = detectCardType(data.cardNumber);

  return (
    <Card className='border-0 shadow-2xl bg-white/95 dark:bg-black/95 backdrop-blur-sm'>
      <CardContent className='p-8 md:p-12'>
        {/* Security Indicator */}
        <div className='mb-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl'>
          <div className='flex items-center space-x-3'>
            <Shield className='w-6 h-6 text-green-600 dark:text-green-400' />
            <div>
              <h3 className='text-sm font-semibold text-green-800 dark:text-green-300'>
                Secure Payment Processing
              </h3>
              <p className='text-sm text-green-600 dark:text-green-400'>
                Your payment information is encrypted and secure. We use industry-standard SSL encryption.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className='space-y-8'>
          {/* Card Number */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='space-y-2'
          >
            <label htmlFor='cardNumber' className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
              Card Number
            </label>
            <div className='relative'>
              <CreditCard className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500' />
              <input
                id='cardNumber'
                type='text'
                value={data.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                onBlur={() => handleFieldBlur('cardNumber')}
                className={`
                  w-full pl-12 pr-16 py-4 rounded-xl border-2 transition-all duration-300
                  bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                  placeholder-gray-400 dark:placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20
                  ${errors.cardNumber 
                    ? 'border-red-500 dark:border-red-400' 
                    : 'border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white'
                  }
                `}
                placeholder='1234 5678 9012 3456'
                maxLength={19}
              />
              
              {/* Card Type Indicator */}
              {cardType && (
                <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                  <div className='px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-medium text-gray-600 dark:text-gray-400 uppercase'>
                    {cardType}
                  </div>
                </div>
              )}
            </div>
            {errors.cardNumber && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-sm text-red-500 dark:text-red-400'
              >
                {errors.cardNumber}
              </motion.p>
            )}
          </motion.div>

          {/* Expiry Date and CVV Row */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Expiry Date */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='space-y-2'
            >
              <label htmlFor='expiryDate' className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                Expiry Date
              </label>
              <input
                id='expiryDate'
                type='text'
                value={data.expiryDate}
                onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                onBlur={() => handleFieldBlur('expiryDate')}
                className={`
                  w-full px-4 py-4 rounded-xl border-2 transition-all duration-300
                  bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                  placeholder-gray-400 dark:placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20
                  ${errors.expiryDate 
                    ? 'border-red-500 dark:border-red-400' 
                    : 'border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white'
                  }
                `}
                placeholder='MM/YY'
                maxLength={5}
              />
              {errors.expiryDate && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='text-sm text-red-500 dark:text-red-400'
                >
                  {errors.expiryDate}
                </motion.p>
              )}
            </motion.div>

            {/* CVV */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className='space-y-2'
            >
              <label htmlFor='cvv' className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                CVV
              </label>
              <div className='relative'>
                <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500' />
                <input
                  id='cvv'
                  type='text'
                  value={data.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value)}
                  onBlur={() => handleFieldBlur('cvv')}
                  className={`
                    w-full pl-12 pr-4 py-4 rounded-xl border-2 transition-all duration-300
                    bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                    placeholder-gray-400 dark:placeholder-gray-500
                    focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20
                    ${errors.cvv 
                      ? 'border-red-500 dark:border-red-400' 
                      : 'border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white'
                    }
                  `}
                  placeholder='123'
                  maxLength={4}
                />
              </div>
              {errors.cvv && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='text-sm text-red-500 dark:text-red-400'
                >
                  {errors.cvv}
                </motion.p>
              )}
            </motion.div>
          </div>

          {/* Cardholder Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='space-y-2'
          >
            <label htmlFor='cardholderName' className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
              Cardholder Name
            </label>
            <input
              id='cardholderName'
              type='text'
              value={data.cardholderName}
              onChange={(e) => handleInputChange('cardholderName', e.target.value)}
              onBlur={() => handleFieldBlur('cardholderName')}
              className={`
                w-full px-4 py-4 rounded-xl border-2 transition-all duration-300
                bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                placeholder-gray-400 dark:placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20
                ${errors.cardholderName 
                  ? 'border-red-500 dark:border-red-400' 
                  : 'border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white'
                }
              `}
              placeholder='John Doe'
            />
            {errors.cardholderName && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-sm text-red-500 dark:text-red-400'
              >
                {errors.cardholderName}
              </motion.p>
            )}
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
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