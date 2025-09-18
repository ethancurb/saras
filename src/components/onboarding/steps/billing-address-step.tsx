/**
 * Billing Address Step Component
 *
 * Third step in the SARAS onboarding flow for collecting billing address information.
 * Features:
 * - Complete billing address form with all required fields
 * - Address line 1 & 2 with proper validation
 * - City, state, and zip code inputs
 * - Country selection dropdown
 * - Real-time form validation and error feedback
 * - Previous/Next navigation
 * - Luxury design aesthetic matching SARAS brand
 * - Responsive layout for mobile and desktop
 * - Dark mode support
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, MapPin, Home, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Billing address data interface
interface BillingAddressData {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Component props interface
interface BillingAddressStepProps {
  data: BillingAddressData;
  onUpdate: (data: BillingAddressData) => void;
  onNext: () => void;
  onPrevious: () => void;
}

// US States list for dropdown
const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming'
];

// Countries list (major countries for now)
const COUNTRIES = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'Other'
];

/**
 * Billing Address Step Component
 *
 * Collects and validates complete billing address:
 * - Street address with optional second line
 * - City, state/province, and postal code
 * - Country selection
 * - Real-time validation feedback
 *
 * @param data - Current form data
 * @param onUpdate - Callback to update form data
 * @param onNext - Callback to proceed to next step
 * @param onPrevious - Callback to go back to previous step
 * @returns {JSX.Element} Billing address form step
 */
export function BillingAddressStep({ data, onUpdate, onNext, onPrevious }: BillingAddressStepProps) {
  // Form validation state
  const [errors, setErrors] = useState<Partial<BillingAddressData>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof BillingAddressData, boolean>>>({});

  /**
   * Validate individual field
   */
  const validateField = (field: keyof BillingAddressData, value: string): string | null => {
    switch (field) {
      case 'addressLine1':
        if (!value.trim()) return 'Street address is required';
        if (value.trim().length < 5) return 'Please enter a complete street address';
        return null;
      case 'city':
        if (!value.trim()) return 'City is required';
        if (value.trim().length < 2) return 'Please enter a valid city name';
        return null;
      case 'state':
        if (!value.trim()) return 'State/Province is required';
        return null;
      case 'zipCode':
        if (!value.trim()) return 'ZIP/Postal code is required';
        // Basic validation for US ZIP codes and international postal codes
        if (data.country === 'United States') {
          if (!/^\d{5}(-\d{4})?$/.test(value)) return 'Please enter a valid ZIP code (12345 or 12345-6789)';
        } else if (value.trim().length < 3) {
          return 'Please enter a valid postal code';
        }
        return null;
      case 'country':
        if (!value.trim()) return 'Country is required';
        return null;
      default:
        return null;
    }
  };

  /**
   * Validate entire form
   */
  const validateForm = (): boolean => {
    const newErrors: Partial<BillingAddressData> = {};
    let isValid = true;

    // Required fields to validate
    const requiredFields: Array<keyof BillingAddressData> = [
      'addressLine1', 'city', 'state', 'zipCode', 'country'
    ];

    requiredFields.forEach(field => {
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
  const handleInputChange = (field: keyof BillingAddressData, value: string) => {
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
  const handleFieldBlur = (field: keyof BillingAddressData) => {
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
    
    // Mark all required fields as touched
    setTouched({
      addressLine1: true,
      city: true,
      state: true,
      zipCode: true,
      country: true,
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
          {/* Address Line 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='space-y-2'
          >
            <label htmlFor='addressLine1' className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
              Street Address
            </label>
            <div className='relative'>
              <Home className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500' />
              <input
                id='addressLine1'
                type='text'
                value={data.addressLine1}
                onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                onBlur={() => handleFieldBlur('addressLine1')}
                className={`
                  w-full pl-12 pr-4 py-4 rounded-xl border-2 transition-all duration-300
                  bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                  placeholder-gray-400 dark:placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20
                  ${errors.addressLine1 
                    ? 'border-red-500 dark:border-red-400' 
                    : 'border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white'
                  }
                `}
                placeholder='123 Main Street'
              />
            </div>
            {errors.addressLine1 && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-sm text-red-500 dark:text-red-400'
              >
                {errors.addressLine1}
              </motion.p>
            )}
          </motion.div>

          {/* Address Line 2 (Optional) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='space-y-2'
          >
            <label htmlFor='addressLine2' className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
              Apartment, Suite, Unit (Optional)
            </label>
            <div className='relative'>
              <Building className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500' />
              <input
                id='addressLine2'
                type='text'
                value={data.addressLine2}
                onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                className='w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 transition-all duration-300
                  bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                  placeholder-gray-400 dark:placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20
                  focus:border-black dark:focus:border-white'
                placeholder='Apt 4B, Suite 100, etc.'
              />
            </div>
          </motion.div>

          {/* City */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='space-y-2'
          >
            <label htmlFor='city' className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
              City
            </label>
            <div className='relative'>
              <MapPin className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500' />
              <input
                id='city'
                type='text'
                value={data.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                onBlur={() => handleFieldBlur('city')}
                className={`
                  w-full pl-12 pr-4 py-4 rounded-xl border-2 transition-all duration-300
                  bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                  placeholder-gray-400 dark:placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20
                  ${errors.city 
                    ? 'border-red-500 dark:border-red-400' 
                    : 'border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white'
                  }
                `}
                placeholder='New York'
              />
            </div>
            {errors.city && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-sm text-red-500 dark:text-red-400'
              >
                {errors.city}
              </motion.p>
            )}
          </motion.div>

          {/* State and ZIP Code Row */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* State */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className='space-y-2'
            >
              <label htmlFor='state' className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                State/Province
              </label>
              {data.country === 'United States' ? (
                <select
                  id='state'
                  value={data.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  onBlur={() => handleFieldBlur('state')}
                  className={`
                    w-full px-4 py-4 rounded-xl border-2 transition-all duration-300
                    bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                    focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20
                    ${errors.state 
                      ? 'border-red-500 dark:border-red-400' 
                      : 'border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white'
                    }
                  `}
                >
                  <option value=''>Select State</option>
                  {US_STATES.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              ) : (
                <input
                  id='state'
                  type='text'
                  value={data.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  onBlur={() => handleFieldBlur('state')}
                  className={`
                    w-full px-4 py-4 rounded-xl border-2 transition-all duration-300
                    bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                    placeholder-gray-400 dark:placeholder-gray-500
                    focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20
                    ${errors.state 
                      ? 'border-red-500 dark:border-red-400' 
                      : 'border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white'
                    }
                  `}
                  placeholder='State/Province'
                />
              )}
              {errors.state && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='text-sm text-red-500 dark:text-red-400'
                >
                  {errors.state}
                </motion.p>
              )}
            </motion.div>

            {/* ZIP Code */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className='space-y-2'
            >
              <label htmlFor='zipCode' className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                {data.country === 'United States' ? 'ZIP Code' : 'Postal Code'}
              </label>
              <input
                id='zipCode'
                type='text'
                value={data.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                onBlur={() => handleFieldBlur('zipCode')}
                className={`
                  w-full px-4 py-4 rounded-xl border-2 transition-all duration-300
                  bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                  placeholder-gray-400 dark:placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20
                  ${errors.zipCode 
                    ? 'border-red-500 dark:border-red-400' 
                    : 'border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white'
                  }
                `}
                placeholder={data.country === 'United States' ? '12345' : 'Postal Code'}
              />
              {errors.zipCode && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='text-sm text-red-500 dark:text-red-400'
                >
                  {errors.zipCode}
                </motion.p>
              )}
            </motion.div>
          </div>

          {/* Country */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className='space-y-2'
          >
            <label htmlFor='country' className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
              Country
            </label>
            <select
              id='country'
              value={data.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              onBlur={() => handleFieldBlur('country')}
              className={`
                w-full px-4 py-4 rounded-xl border-2 transition-all duration-300
                bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20
                ${errors.country 
                  ? 'border-red-500 dark:border-red-400' 
                  : 'border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white'
                }
              `}
            >
              <option value=''>Select Country</option>
              {COUNTRIES.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            {errors.country && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-sm text-red-500 dark:text-red-400'
              >
                {errors.country}
              </motion.p>
            )}
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
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