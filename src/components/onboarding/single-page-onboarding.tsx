/**
 * Single-Page Onboarding Component for SARAS
 *
 * Consolidated onboarding experience with all sections visible on one page.
 * Features:
 * - All form sections displayed together for easier completion
 * - Payment summary with breakdown of costs including transaction fees and taxes
 * - Thicker header design to better accommodate all components
 * - Smooth scrolling between sections
 * - Real-time validation across all form fields
 * - Luxury design aesthetic matching SARAS brand
 * - Mobile-responsive layout
 * - Dark mode support
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Check, 
  X, 
  Home, 
  Building, 
  MapPin, 
  CreditCard, 
  Shield, 
  Star,
  Loader2,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Complete onboarding data interface
interface OnboardingData {
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

// Countries list
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

// Password strength criteria
const PASSWORD_CRITERIA = [
  { id: 'length', label: 'At least 8 characters', test: (pwd: string) => pwd.length >= 8 },
  { id: 'uppercase', label: 'One uppercase letter', test: (pwd: string) => /[A-Z]/.test(pwd) },
  { id: 'lowercase', label: 'One lowercase letter', test: (pwd: string) => /[a-z]/.test(pwd) },
  { id: 'number', label: 'One number', test: (pwd: string) => /\d/.test(pwd) },
  { id: 'special', label: 'One special character', test: (pwd: string) => /[!@#$%^&*(),.?\":{}|<>]/.test(pwd) },
];

// Card type detection patterns
const CARD_PATTERNS = {
  visa: /^4/,
  mastercard: /^5[1-5]|^2[2-7]/,
  amex: /^3[47]/,
  discover: /^6(?:011|5)/,
};

/**
 * Single Page Onboarding Component
 *
 * Complete onboarding experience on one page with:
 * - All form sections visible simultaneously
 * - Payment breakdown with fees and taxes
 * - Enhanced header design
 * - Real-time validation
 * - Comprehensive error handling
 *
 * @returns {JSX.Element} Complete single-page onboarding interface
 */
export function SinglePageOnboarding() {
  // Form data state
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

  // UI state
  const [errors, setErrors] = useState<any>({});
  const [touched, setTouched] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Payment calculation
  const monthlyRate = 9.99;
  const transactionFee = 0.82;
  const taxes = 0.83; // Approximately 8.3% tax rate
  const totalAmount = monthlyRate + transactionFee + taxes;

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
    return chunks.join(' ').substr(0, 19);
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
   * Get password strength score
   */
  const getPasswordStrength = (password: string): number => {
    if (!password) return 0;
    const metCriteria = PASSWORD_CRITERIA.filter(criteria => criteria.test(password));
    return metCriteria.length;
  };

  /**
   * Get password strength display
   */
  const getPasswordStrengthDisplay = (score: number) => {
    if (score <= 1) return { label: 'Weak', color: 'text-red-500', bgColor: 'bg-red-500' };
    if (score <= 3) return { label: 'Fair', color: 'text-yellow-500', bgColor: 'bg-yellow-500' };
    if (score <= 4) return { label: 'Good', color: 'text-blue-500', bgColor: 'bg-blue-500' };
    return { label: 'Strong', color: 'text-green-500', bgColor: 'bg-green-500' };
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
   * Update form data
   */
  const updateFormData = (section: keyof OnboardingData, field: string, value: any) => {
    setFormData(prev => {
      if (section === 'termsAccepted') {
        return { ...prev, termsAccepted: value };
      }
      
      return {
        ...prev,
        [section]: {
          ...(prev[section] as any),
          [field]: value
        }
      };
    });
  };

  /**
   * Handle input change with formatting
   */
  const handleInputChange = (section: keyof OnboardingData, field: string, value: string) => {
    let formattedValue = value;

    // Apply formatting based on field
    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substr(0, 4);
    }

    updateFormData(section, field, formattedValue);
  };

  /**
   * Validate entire form
   */
  const validateForm = (): boolean => {
    const newErrors: any = {};
    let isValid = true;

    // Personal info validation
    if (!formData.personalInfo.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }
    if (!formData.personalInfo.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }
    if (!formData.personalInfo.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.personalInfo.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Password validation
    if (getPasswordStrength(formData.accountSetup.password) < 5) {
      newErrors.password = 'Password must meet all security requirements';
      isValid = false;
    }
    if (formData.accountSetup.password !== formData.accountSetup.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    // Billing address validation
    if (!formData.billingAddress.addressLine1.trim()) {
      newErrors.addressLine1 = 'Street address is required';
      isValid = false;
    }
    if (!formData.billingAddress.city.trim()) {
      newErrors.city = 'City is required';
      isValid = false;
    }
    if (!formData.billingAddress.state.trim()) {
      newErrors.state = 'State is required';
      isValid = false;
    }
    if (!formData.billingAddress.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
      isValid = false;
    }
    if (!formData.billingAddress.country.trim()) {
      newErrors.country = 'Country is required';
      isValid = false;
    }

    // Payment info validation
    if (!isValidCardNumber(formData.paymentInfo.cardNumber)) {
      newErrors.cardNumber = 'Please enter a valid card number';
      isValid = false;
    }
    if (!/^\d{2}\/\d{2}$/.test(formData.paymentInfo.expiryDate)) {
      newErrors.expiryDate = 'Please enter date as MM/YY';
      isValid = false;
    }
    if (!/^\d{3,4}$/.test(formData.paymentInfo.cvv)) {
      newErrors.cvv = 'CVV must be 3 or 4 digits';
      isValid = false;
    }
    if (!formData.paymentInfo.cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required';
      isValid = false;
    }

    // Terms validation
    if (!formData.termsAccepted) {
      newErrors.terms = 'You must accept the terms and conditions';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      // TODO: Implement actual API call
      console.log('Submitting onboarding data:', formData);
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Account created successfully! Welcome to SARAS Ultimate.');
    } catch (error) {
      setSubmitError('An error occurred while creating your account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const passwordStrength = getPasswordStrength(formData.accountSetup.password);
  const strengthDisplay = getPasswordStrengthDisplay(passwordStrength);
  const cardType = detectCardType(formData.paymentInfo.cardNumber);

  return (
    <div className='min-h-screen bg-gradient-to-br from-white via-gray-50 to-white dark:from-dark-background dark:via-dark-background-secondary dark:to-dark-background'>
      <div className='pt-24'> {/* Add top padding to account for fixed header */}
        <div className='container-premium py-12'>
        <div className='max-w-6xl mx-auto'>
          <form onSubmit={handleSubmit} className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Left Column - Form Sections */}
            <div className='lg:col-span-2 space-y-8'>
              {/* Account Setup Section - Combined Personal Info and Password */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className='border-0 shadow-lg bg-white/95 dark:bg-black/95 backdrop-blur-sm'>
                  <CardHeader>
                    <CardTitle className='flex items-center space-x-3'>
                      <User className='w-6 h-6' />
                      <span>Account Setup</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-6'>
                    {/* Personal Information Fields */}
                    <div className='space-y-6'>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        {/* First Name */}
                        <div className='space-y-2'>
                          <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                            First Name
                          </label>
                          <input
                            type='text'
                            value={formData.personalInfo.firstName}
                            onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                            className={`
                              w-full px-4 py-3 rounded-xl border-2 transition-all duration-300
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
                          {errors.firstName && (
                            <p className='text-sm text-red-500 dark:text-red-400'>{errors.firstName}</p>
                          )}
                        </div>

                        {/* Last Name */}
                        <div className='space-y-2'>
                          <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                            Last Name
                          </label>
                          <input
                            type='text'
                            value={formData.personalInfo.lastName}
                            onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                            className={`
                              w-full px-4 py-3 rounded-xl border-2 transition-all duration-300
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
                          {errors.lastName && (
                            <p className='text-sm text-red-500 dark:text-red-400'>{errors.lastName}</p>
                          )}
                        </div>
                      </div>

                      {/* Email */}
                      <div className='space-y-2'>
                        <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                          Email Address
                        </label>
                        <div className='relative'>
                          <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500' />
                          <input
                            type='email'
                            value={formData.personalInfo.email}
                            onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
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
                          />
                        </div>
                        {errors.email && (
                          <p className='text-sm text-red-500 dark:text-red-400'>{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className='border-t border-gray-200 dark:border-gray-700 my-6'></div>

                    {/* Password Setup Fields */}
                    <div className='space-y-6'>
                      {/* Password */}
                      <div className='space-y-4'>
                        <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                          Create Password
                        </label>
                        <div className='relative'>
                          <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500' />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={formData.accountSetup.password}
                            onChange={(e) => handleInputChange('accountSetup', 'password', e.target.value)}
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
                            placeholder='Create a strong password'
                          />
                          <button
                            type='button'
                            onClick={() => setShowPassword(!showPassword)}
                            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500'
                          >
                            {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                          </button>
                        </div>

                        {/* Password Strength */}
                        {formData.accountSetup.password && (
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
                            <div className='grid grid-cols-2 gap-2'>
                              {PASSWORD_CRITERIA.map((criteria) => {
                                const isMet = criteria.test(formData.accountSetup.password);
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
                          <p className='text-sm text-red-500 dark:text-red-400'>{errors.password}</p>
                        )}
                      </div>

                      {/* Confirm Password */}
                      <div className='space-y-2'>
                        <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                          Confirm Password
                        </label>
                        <div className='relative'>
                          <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500' />
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={formData.accountSetup.confirmPassword}
                            onChange={(e) => handleInputChange('accountSetup', 'confirmPassword', e.target.value)}
                            className={`
                              w-full pl-12 pr-12 py-3 rounded-xl border-2 transition-all duration-300
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
                            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500'
                          >
                            {showConfirmPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                          </button>
                        </div>
                        {errors.confirmPassword && (
                          <p className='text-sm text-red-500 dark:text-red-400'>{errors.confirmPassword}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Billing Address Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className='border-0 shadow-lg bg-white/95 dark:bg-black/95 backdrop-blur-sm'>
                  <CardHeader>
                    <CardTitle className='flex items-center space-x-3'>
                      <MapPin className='w-6 h-6' />
                      <span>Billing Address</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-6'>
                    {/* Address Line 1 */}
                    <div className='space-y-2'>
                      <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                        Street Address
                      </label>
                      <div className='relative'>
                        <Home className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500' />
                        <input
                          type='text'
                          value={formData.billingAddress.addressLine1}
                          onChange={(e) => handleInputChange('billingAddress', 'addressLine1', e.target.value)}
                          className={`
                            w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-300
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
                        <p className='text-sm text-red-500 dark:text-red-400'>{errors.addressLine1}</p>
                      )}
                    </div>

                    {/* Address Line 2 */}
                    <div className='space-y-2'>
                      <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                        Apartment, Suite, Unit (Optional)
                      </label>
                      <div className='relative'>
                        <Building className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500' />
                        <input
                          type='text'
                          value={formData.billingAddress.addressLine2}
                          onChange={(e) => handleInputChange('billingAddress', 'addressLine2', e.target.value)}
                          className='w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 transition-all duration-300
                            bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                            placeholder-gray-400 dark:placeholder-gray-500
                            focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20
                            focus:border-black dark:focus:border-white'
                          placeholder='Apt 4B, Suite 100, etc.'
                        />
                      </div>
                    </div>

                    {/* City */}
                    <div className='space-y-2'>
                      <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                        City
                      </label>
                      <input
                        type='text'
                        value={formData.billingAddress.city}
                        onChange={(e) => handleInputChange('billingAddress', 'city', e.target.value)}
                        className={`
                          w-full px-4 py-3 rounded-xl border-2 transition-all duration-300
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
                      {errors.city && (
                        <p className='text-sm text-red-500 dark:text-red-400'>{errors.city}</p>
                      )}
                    </div>

                    {/* State and ZIP */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <div className='space-y-2'>
                        <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                          State/Province
                        </label>
                        {formData.billingAddress.country === 'United States' ? (
                          <select
                            value={formData.billingAddress.state}
                            onChange={(e) => handleInputChange('billingAddress', 'state', e.target.value)}
                            className={`
                              w-full px-4 py-3 rounded-xl border-2 transition-all duration-300
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
                            type='text'
                            value={formData.billingAddress.state}
                            onChange={(e) => handleInputChange('billingAddress', 'state', e.target.value)}
                            className={`
                              w-full px-4 py-3 rounded-xl border-2 transition-all duration-300
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
                          <p className='text-sm text-red-500 dark:text-red-400'>{errors.state}</p>
                        )}
                      </div>

                      <div className='space-y-2'>
                        <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                          {formData.billingAddress.country === 'United States' ? 'ZIP Code' : 'Postal Code'}
                        </label>
                        <input
                          type='text'
                          value={formData.billingAddress.zipCode}
                          onChange={(e) => handleInputChange('billingAddress', 'zipCode', e.target.value)}
                          className={`
                            w-full px-4 py-3 rounded-xl border-2 transition-all duration-300
                            bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                            placeholder-gray-400 dark:placeholder-gray-500
                            focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20
                            ${errors.zipCode 
                              ? 'border-red-500 dark:border-red-400' 
                              : 'border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white'
                            }
                          `}
                          placeholder={formData.billingAddress.country === 'United States' ? '12345' : 'Postal Code'}
                        />
                        {errors.zipCode && (
                          <p className='text-sm text-red-500 dark:text-red-400'>{errors.zipCode}</p>
                        )}
                      </div>
                    </div>

                    {/* Country */}
                    <div className='space-y-2'>
                      <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                        Country
                      </label>
                      <select
                        value={formData.billingAddress.country}
                        onChange={(e) => handleInputChange('billingAddress', 'country', e.target.value)}
                        className={`
                          w-full px-4 py-3 rounded-xl border-2 transition-all duration-300
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
                        <p className='text-sm text-red-500 dark:text-red-400'>{errors.country}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Payment Information Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className='border-0 shadow-lg bg-white/95 dark:bg-black/95 backdrop-blur-sm'>
                  <CardHeader>
                    <CardTitle className='flex items-center space-x-3'>
                      <CreditCard className='w-6 h-6' />
                      <span>Payment Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-6'>
                    {/* Security Notice */}
                    <div className='p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl'>
                      <div className='flex items-center space-x-3'>
                        <Shield className='w-6 h-6 text-green-600 dark:text-green-400' />
                        <div>
                          <h3 className='text-sm font-semibold text-green-800 dark:text-green-300'>
                            Secure Payment Processing
                          </h3>
                          <p className='text-sm text-green-600 dark:text-green-400'>
                            Your payment information is encrypted and secure.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Card Number */}
                    <div className='space-y-2'>
                      <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                        Card Number
                      </label>
                      <div className='relative'>
                        <CreditCard className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500' />
                        <input
                          type='text'
                          value={formData.paymentInfo.cardNumber}
                          onChange={(e) => handleInputChange('paymentInfo', 'cardNumber', e.target.value)}
                          className={`
                            w-full pl-12 pr-16 py-3 rounded-xl border-2 transition-all duration-300
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
                        {cardType && (
                          <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                            <div className='px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-medium text-gray-600 dark:text-gray-400 uppercase'>
                              {cardType}
                            </div>
                          </div>
                        )}
                      </div>
                      {errors.cardNumber && (
                        <p className='text-sm text-red-500 dark:text-red-400'>{errors.cardNumber}</p>
                      )}
                    </div>

                    {/* Expiry and CVV */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <div className='space-y-2'>
                        <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                          Expiry Date
                        </label>
                        <input
                          type='text'
                          value={formData.paymentInfo.expiryDate}
                          onChange={(e) => handleInputChange('paymentInfo', 'expiryDate', e.target.value)}
                          className={`
                            w-full px-4 py-3 rounded-xl border-2 transition-all duration-300
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
                          <p className='text-sm text-red-500 dark:text-red-400'>{errors.expiryDate}</p>
                        )}
                      </div>

                      <div className='space-y-2'>
                        <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                          CVV
                        </label>
                        <input
                          type='text'
                          value={formData.paymentInfo.cvv}
                          onChange={(e) => handleInputChange('paymentInfo', 'cvv', e.target.value)}
                          className={`
                            w-full px-4 py-3 rounded-xl border-2 transition-all duration-300
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
                        {errors.cvv && (
                          <p className='text-sm text-red-500 dark:text-red-400'>{errors.cvv}</p>
                        )}
                      </div>
                    </div>

                    {/* Cardholder Name */}
                    <div className='space-y-2'>
                      <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                        Cardholder Name
                      </label>
                      <input
                        type='text'
                        value={formData.paymentInfo.cardholderName}
                        onChange={(e) => handleInputChange('paymentInfo', 'cardholderName', e.target.value)}
                        className={`
                          w-full px-4 py-3 rounded-xl border-2 transition-all duration-300
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
                        <p className='text-sm text-red-500 dark:text-red-400'>{errors.cardholderName}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Right Column - Order Summary */}
            <div className='lg:col-span-1'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className='sticky top-32'
              >
                <Card className='border-0 shadow-xl bg-white/95 dark:bg-black/95 backdrop-blur-sm'>
                  <CardHeader>
                    <CardTitle className='flex items-center space-x-3'>
                      <span>Order Summary</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-6'>
                    {/* Subscription Details */}
                    <div className='space-y-4'>
                      <div className='flex items-center justify-between'>
                        <div>
                          <h4 className='font-semibold text-gray-900 dark:text-white'>
                            SARAS Ultimate
                          </h4>
                          <p className='text-sm text-gray-600 dark:text-gray-400'>
                            Early Access Rate (locked forever)
                          </p>
                        </div>
                        <div className='text-right'>
                          <div className='text-lg font-bold text-gray-900 dark:text-white'>
                            ${monthlyRate.toFixed(2)}
                          </div>
                          <div className='text-sm text-gray-500 dark:text-gray-400 line-through'>
                            $29.99
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cost Breakdown */}
                    <div className='space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700'>
                      <div className='flex justify-between text-sm'>
                        <span className='text-gray-600 dark:text-gray-400'>Monthly Subscription</span>
                        <span className='text-gray-900 dark:text-white'>${monthlyRate.toFixed(2)}</span>
                      </div>
                      <div className='flex justify-between text-sm'>
                        <span className='text-gray-600 dark:text-gray-400'>Transaction Fee</span>
                        <span className='text-gray-900 dark:text-white'>${transactionFee.toFixed(2)}</span>
                      </div>
                      <div className='flex justify-between text-sm'>
                        <span className='text-gray-600 dark:text-gray-400'>Taxes</span>
                        <span className='text-gray-900 dark:text-white'>${taxes.toFixed(2)}</span>
                      </div>
                      <div className='flex justify-between text-lg font-semibold text-gray-900 dark:text-white pt-3 border-t border-gray-200 dark:border-gray-700'>
                        <span>Total (monthly)</span>
                        <span>${totalAmount.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Terms Acceptance */}
                    <div className='space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700'>
                      <label className='flex items-start space-x-3 cursor-pointer group'>
                        <div className='relative'>
                          <input
                            type='checkbox'
                            checked={formData.termsAccepted}
                            onChange={(e) => updateFormData('termsAccepted', '', e.target.checked)}
                            className='sr-only'
                          />
                          <div
                            className={`
                              w-5 h-5 rounded border-2 transition-all duration-300 flex items-center justify-center
                              ${formData.termsAccepted
                                ? 'bg-black dark:bg-white border-black dark:border-white'
                                : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600'
                              }
                            `}
                          >
                            {formData.termsAccepted && (
                              <Check className='w-3 h-3 text-white dark:text-black' />
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
                        </div>
                      </label>
                      {errors.terms && (
                        <p className='text-sm text-red-500 dark:text-red-400'>{errors.terms}</p>
                      )}
                    </div>

                    {/* Error Message */}
                    {submitError && (
                      <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4'>
                        <p className='text-red-700 dark:text-red-400 text-sm'>{submitError}</p>
                      </div>
                    )}

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
                      {isSubmitting ? 'Creating Account...' : 'Complete Signup'}
                    </Button>

                    {/* Trust Indicators */}
                    <div className='space-y-2 text-center pt-4 border-t border-gray-200 dark:border-gray-700'>
                      <div className='flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400'>
                        <span>Cancel anytime, no hidden fees</span>
                      </div>
                      <div className='flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400'>
                        <span>Early access rate locked forever</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </form>
        </div>
      </div>
    </div>

      {/* Terms Modal */}
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
    </div>
  );
}