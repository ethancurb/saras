/**
 * Root Layout for SARAS Luxury Fitness Application
 * Defines global layout structure, fonts, and metadata for the entire application
 */

import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ThemeProvider } from '@/lib/theme-context';

// Primary font - Inter for body text and UI elements
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

// Secondary font - Playfair Display for elegant headings
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
});

// SEO and social media metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://saras.ai'),
  title: {
    default: 'SARAS - Luxury AI Fitness Companion',
    template: '%s | SARAS AI Fitness',
  },
  description:
    'Experience the future of fitness with SARAS - your personal AI companion that adapts, learns, and evolves with you. Where luxury meets intelligence in digital fitness.',
  keywords: [
    'AI fitness',
    'personal trainer',
    'luxury fitness',
    'artificial intelligence',
    'workout planner',
    'nutrition tracking',
    'fitness companion',
    'SARAS Engine',
  ],
  authors: [{ name: 'SARAS AI Fitness' }],
  creator: 'SARAS AI Fitness',
  publisher: 'SARAS AI Fitness',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://saras.ai',
    title: 'SARAS - Luxury AI Fitness Companion',
    description:
      'Experience the future of fitness with SARAS - your personal AI companion that adapts, learns, and evolves with you.',
    siteName: 'SARAS AI Fitness',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SARAS AI Fitness - Luxury meets Intelligence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SARAS - Luxury AI Fitness Companion',
    description: 
      'Experience the future of fitness with SARAS - your personal AI companion that adapts, learns, and evolves with you.',
    images: ['/twitter-image.jpg'],
    creator: '@saras_ai',
  },
};

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#0F0F0F' },
  ],
};

/**
 * Root Layout Component
 * Provides the foundational structure for all pages
 * 
 * @param children - Page content to be rendered
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${playfairDisplay.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      
      <body 
        className="font-sans bg-white dark:bg-dark-background text-black dark:text-white antialiased min-h-screen flex flex-col"
        suppressHydrationWarning
      >
        <ThemeProvider>
          {/* Global Header Navigation */}
          <Header />
          
          {/* Main Content Area */}
          <main className="flex-1 pt-20">
            {children}
          </main>
          
          {/* Global Footer */}
          <Footer />
        </ThemeProvider>
        
        {/* Scroll to top on route change */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('beforeunload', () => {
                window.scrollTo(0, 0);
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
