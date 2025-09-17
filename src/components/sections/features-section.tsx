/**
 * Features Section Component for SARAS Fitness Application
 * Highlights AI personalization, continuous adaptation, and advantages over human trainers
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Zap, 
  Clock, 
  Target, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { FeatureItem } from '@/types';

// Main features highlighting AI advantages
const mainFeatures: FeatureItem[] = [
  {
    id: 'ai-personalization',
    title: 'AI-Powered Personalization',
    description: 'The SARAS Engine analyzes your unique patterns, preferences, and progress to create truly personalized fitness experiences that evolve with you.',
    icon: Brain,
    highlight: true,
  },
  {
    id: 'continuous-adaptation',
    title: 'Continuous Adaptation',
    description: 'SARAS learns from every workout, recovery metric, and performance metric to refine your program in real time.',
    icon: TrendingUp,
    highlight: true,
  },
  {
    id: '24-7-availability',
    title: '24/7 Availability',
    description: 'Your AI trainer never sleeps. Get instant guidance, workout generation, and advanced performance and recovery analysis, whenever you need it, day or night.',
    icon: Clock,
    highlight: true,
  },
];

// Comparison features vs traditional training
const comparisonFeatures = [
  {
    traditional: 'Weekly check-ins with trainer',
    saras: 'Continuous monitoring and adaptation',
    icon: Target,
  },
  {
    traditional: 'Generic program modifications',
    saras: 'AI-driven personalized adjustments',
    icon: Brain,
  },
  {
    traditional: 'Limited availability',
    saras: 'Always available guidance',
    icon: Zap,
  },
  {
    traditional: 'Subjective assessments',
    saras: 'Data-driven insights',
    icon: TrendingUp,
  },
];

/**
 * Main Features Section Component
 */
export function FeaturesSection() {
  return (
    <section id="features" className="section-padding bg-white dark:bg-black">
      <div className="container-premium">
        <div className="space-y-16">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-black/10 dark:bg-white/10 rounded-full border border-black/20 dark:border-white/20">
              <span className="text-sm font-medium text-gray-700 dark:text-white">
                The SARAS Advantage
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white max-w-4xl mx-auto">
              Beyond Human Limitations
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-white max-w-3xl mx-auto leading-relaxed">
              Experience fitness coaching that transcends traditional boundries. 
              Where AI intelligence meets user-centric experience to deliver optimal training results.
            </p>
          </motion.div>

          {/* Main Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card 
                  variant={feature.highlight ? 'accent' : 'default'}
                  size="lg"
                  interactive="hover"
                  className="h-full group"
                >
                  <CardHeader>
                    <div className="w-16 h-16 bg-black/10 dark:bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-black/20 dark:group-hover:bg-white/20 transition-colors duration-300 mb-4">
                      <feature.icon className="w-8 h-8 text-gray-600 dark:text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Comparison Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Traditional Training vs. SARAS Intelligence
              </h3>
              <p className="text-lg text-gray-600 dark:text-white max-w-2xl mx-auto">
                See how AI-powered coaching transforms the fitness experience
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              
              {/* Traditional Column */}
              <Card variant="default" size="lg" className="space-y-6">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-700 dark:text-white flex items-center">
                    <Users className="w-6 h-6 mr-3 text-gray-500 dark:text-white" />
                    Traditional Training
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {comparisonFeatures.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-black/5 dark:bg-white/5 rounded-lg">
                      <div className="w-6 h-6 bg-black/20 dark:bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-black/60 dark:bg-white/60 rounded-full" />
                      </div>
                      <span className="text-gray-600 dark:text-white">{item.traditional}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* SARAS Column */}
              <Card variant="accent" size="lg" className="space-y-6 relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <div className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-xs font-semibold rounded-full">
                    AI POWERED
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900 dark:text-white flex items-center">
                    <Brain className="w-6 h-6 mr-3 text-gray-600 dark:text-white" />
                    SARAS Intelligence
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {comparisonFeatures.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-3 p-3 bg-white dark:bg-dark-background-tertiary rounded-lg shadow-sm"
                    >
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-white font-medium">{item.saras}</span>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-8 bg-white dark:bg-dark-background-tertiary rounded-3xl p-12 shadow-xl"
          >
            <div className="space-y-4">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Ready to Experience the Future?
              </h3>
              <p className="text-lg text-gray-600 dark:text-white max-w-2xl mx-auto">
                Join thousands who've discovered the power of AI-driven fitness coaching. 
                Your personalized journey starts today.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button 
                variant="primary" 
                size="lg"
                className="group"
                icon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />}
                iconPosition="right"
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Your Transformation
              </Button>
              
              <Button variant="ghost" size="lg">
                Explore Features
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}