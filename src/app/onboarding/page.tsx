/**
 * SARAS Onboarding Page - Premium User Registration Flow
 *
 * This page handles the complete onboarding experience for new SARAS Ultimate members.
 * Features:
 * - Single-page form with all sections visible
 * - Payment breakdown with transaction fees and taxes
 * - Uses the original header component with enhanced thickness
 * - Personal information collection (name, email)
 * - Account setup with secure password creation
 * - Billing address information
 * - Payment method collection
 * - Terms and conditions acceptance
 * - Luxury design consistent with brand aesthetic
 * - Real-time validation and error handling
 * - Mobile-responsive design
 * - Dark mode support throughout
 */

'use client';

import React from 'react';
import { Header } from '@/components/layout/header';
import { SinglePageOnboarding } from '@/components/onboarding/single-page-onboarding';

/**
 * Onboarding Page Component
 *
 * Renders the complete onboarding experience with:
 * - Original header component with enhanced thickness
 * - Single-page layout with all form sections visible
 * - Payment summary with detailed cost breakdown
 * - Premium visual design matching SARAS brand
 * - Secure form handling and validation
 *
 * @returns {JSX.Element} Complete onboarding page
 */
export default function OnboardingPage() {
  return (
    <>
      <Header />
      <SinglePageOnboarding />
    </>
  );
}