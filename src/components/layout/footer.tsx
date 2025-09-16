/**
 * Luxury Footer Component for SARAS Fitness Application
 * Provides comprehensive site navigation and company information with elegant styling
 */

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Instagram, 
  Twitter, 
  Linkedin, 
  Mail, 
  MapPin, 
  Phone, 
  ArrowUpRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Footer link section configurations
const footerSections = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'SARAS Engine', href: '#technology' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Updates', href: '#updates' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Careers', href: '#careers' },
      { label: 'Press', href: '#press' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '#help' },
      { label: 'Community', href: '#community' },
      { label: 'Documentation', href: '#docs' },
      { label: 'API', href: '#api' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms of Service', href: '#terms' },
      { label: 'Cookie Policy', href: '#cookies' },
      { label: 'GDPR', href: '#gdpr' },
    ],
  },
];

// Social media links
const socialLinks = [
  { 
    icon: Instagram, 
    href: 'https://instagram.com', 
    label: 'Instagram',
    handle: '@sarasfitness'
  },
  { 
    icon: Twitter, 
    href: 'https://twitter.com', 
    label: 'Twitter',
    handle: '@saras_ai'
  },
  { 
    icon: Linkedin, 
    href: 'https://linkedin.com', 
    label: 'LinkedIn',
    handle: 'SARAS AI Fitness'
  },
];

// Contact information
const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@saras.ai',
    href: 'mailto:hello@saras.ai',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: 'San Francisco, CA',
    href: '#',
  },
];

/**
 * Main Footer Component
 * Comprehensive footer with multiple sections and luxury styling
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-black text-black dark:text-white border-t border-gray-200 dark:border-white/20">
      {/* Main footer content */}
      <div className="container-premium section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Brand section */}
          <div className="lg:col-span-4 space-y-6">
            {/* Logo and brand */}
            <div className="flex justify-center lg:justify-start items-center">
              <div className="relative h-12 w-48">
                {/* Light theme logo (visible in light mode) */}
                <Image
                  src="/logo light.png?v=2"
                  alt="SARAS AI Fitness"
                  fill
                  priority
                  className="object-contain block dark:hidden"
                />
                
                {/* Dark theme logo (visible in dark mode) */}
                <Image
                  src="/logo dark.png?v=2"
                  alt="SARAS AI Fitness"
                  fill
                  priority
                  className="object-contain hidden dark:block"
                />
              </div>
            </div>

            {/* Brand description */}
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-md text-center lg:text-left">
              Experience the future of fitness with SARAS - your personal AI companion 
              that adapts, learns, and evolves with you. Where sophistication meets intelligence.
            </p>

            {/* Newsletter subscription */}
            <div className="space-y-3 text-center lg:text-left">
              <h4 className="text-lg font-semibold text-black dark:text-white">
                Stay Updated
              </h4>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white focus:outline-none transition-colors duration-300"
                />
                <button className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-300 font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Links sections */}
          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-4">
                <h4 className="text-lg font-semibold text-black dark:text-white">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300 group flex items-center"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact section */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-lg font-semibold text-black dark:text-white">
              Get in Touch
            </h4>
            
            {/* Contact information */}
            <div className="space-y-4">
              {contactInfo.map((contact) => (
                <Link
                  key={contact.label}
                  href={contact.href}
                  className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300 group"
                >
                  <contact.icon className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <div className="text-sm font-medium">{contact.label}</div>
                    <div className="text-sm">{contact.value}</div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Social media links */}
            <div className="space-y-4">
              <h5 className="text-base font-semibold text-black dark:text-white">
                Follow Us
              </h5>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="group p-3 bg-gray-200 dark:bg-gray-800 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors duration-300" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="border-t border-gray-300 dark:border-gray-700">
        <div className="container-premium py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              © {currentYear} SARAS AI Fitness. All rights reserved.
            </div>
            
            <div className="flex flex-wrap items-center space-x-6 text-sm">
              <Link
                href="#privacy"
                className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="#terms"
                className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <Link
                href="#cookies"
                className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300"
              >
                Cookie Settings
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <BackToTopButton />
    </footer>
  );
}

/**
 * Back to Top Button Component
 * Smooth scroll to page top with elegant animation
 */
function BackToTopButton() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 p-3 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 hover:scale-110 group"
      aria-label="Back to top"
    >
      <ArrowUpRight className="w-5 h-5 transform -rotate-45 group-hover:-translate-y-1 transition-transform duration-300" />
    </button>
  );
}