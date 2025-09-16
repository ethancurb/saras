/**
 * Testimonials Section Component for SARAS Fitness Application
 * Placeholder component for customer testimonials and success stories
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';

// Placeholder testimonials
const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Executive',
    company: 'Tech Startup',
    content: 'SARAS has revolutionized my fitness routine. The AI understands my schedule and adapts workouts perfectly. I\'ve never been more consistent.',
    avatar: '/avatars/sarah.jpg',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Investment Banker',
    company: 'Goldman Sachs',
    content: 'The premium experience is unmatched. 24/7 availability means I can work out at 3 AM and still get perfect guidance. Game-changing.',
    avatar: '/avatars/michael.jpg',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    role: 'Founder & CEO',
    company: 'Healthcare AI',
    content: 'As someone who values both technology and wellness, SARAS delivers on both fronts. The personalization is incredibly sophisticated.',
    avatar: '/avatars/emma.jpg',
    rating: 5,
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Professional Athlete',
    company: 'Olympic Training',
    content: 'I thought human coaches were irreplaceable. SARAS proved me wrong. The insights and adaptations are beyond anything I\'ve experienced.',
    avatar: '/avatars/david.jpg',
    rating: 5,
  },
  {
    id: 5,
    name: 'Isabella Martinez',
    role: 'Creative Director',
    company: 'Design Agency',
    content: 'The interface is beautiful and the experience feels truly luxurious. It\'s like having a personal trainer who actually understands me.',
    avatar: '/avatars/isabella.jpg',
    rating: 5,
  },
  {
    id: 6,
    name: 'James Thompson',
    role: 'Surgeon',
    company: 'Mayo Clinic',
    content: 'Precision and reliability are crucial in my field. SARAS brings that same level of excellence to fitness coaching.',
    avatar: '/avatars/james.jpg',
    rating: 5,
  },
];

/**
 * Testimonials Section Component
 */
export function TestimonialsSection() {
  return (
    <section className="section-padding bg-white dark:bg-black">
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white max-w-4xl mx-auto">
              Trusted by Elite Professionals
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-white max-w-3xl mx-auto leading-relaxed">
              Leaders across industries choose SARAS for uncompromising quality and results. 
              Discover what makes the difference.
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card 
                  variant="default"
                  size="lg"
                  interactive="hover"
                  className="h-full relative"
                >
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6">
                    <Quote className="w-8 h-8 text-gray-400 dark:text-white" />
                  </div>
                  
                  <CardHeader className="space-y-4">
                    {/* Rating */}
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-5 h-5 text-yellow-400 fill-current" 
                        />
                      ))}
                    </div>
                    
                    {/* Avatar and Info */}
                    <div className="flex items-center space-x-4">
                      {/* Avatar Placeholder */}
                      <div className="w-12 h-12 bg-black/20 dark:bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-lg font-semibold text-gray-600 dark:text-white">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-white">
                          {testimonial.role}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-white">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed text-gray-700 dark:text-white">
                      "{testimonial.content}"
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-gray-200"
          >
            {[
              { number: '10K+', label: 'Elite Members' },
              { number: '98%', label: 'Satisfaction Rate' },
              { number: '24/7', label: 'AI Availability' },
              { number: '50+', label: 'Countries' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-white">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}