'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { useServiceRequest } from '@/contexts/ServiceRequestContext';
import { Button } from '@/components/ui/button';

// Service data
const services = [
  {
    id: 'heavy-equipment-erection',
    title: 'Heavy Equipment Erection',
    description: 'Professional erection of large-scale industrial equipment and heavy machinery with precision and safety.',
    imageUrl: '/images/industrial-equipment.jpeg',
    features: [
      'Expert handling of heavy industrial machinery',
      'Precision alignment and calibration',
      'Load testing and operational verification',
      'Comprehensive safety protocols',
      'Technical documentation and training'
    ],
    benefits: [
      'Minimized downtime during equipment erection',
      'Extended equipment lifespan through proper setup',
      'Enhanced operational efficiency',
      'Compliance with industry standards and regulations'
    ]
  },
  {
    id: 'industrial-equipment-erection',
    title: 'Industrial Equipment Erection',
    description: 'Specialized erection services for manufacturing equipment, production lines, and industrial systems.',
    imageUrl: '/images/equipment-erection.jpeg',
    features: [
      'Production line setup and integration',
      'Manufacturing equipment erection',
      'Robotic system installation',
      'Industrial control system setup',
      'Performance testing and optimization'
    ],
    benefits: [
      'Streamlined production workflows',
      'Maximized manufacturing efficiency',
      'Reduced operational disruptions',
      'Expert technical guidance throughout the process'
    ]
  },
  {
    id: 'medical-equipment-erection',
    title: 'Medical Equipment Erection',
    description: 'Specialized erection and installation of sensitive medical equipment for hospitals and healthcare facilities.',
    imageUrl: '/images/medical-equipment.jpeg',
    features: [
      'Clean room standard compliance',
      'Diagnostic equipment erection',
      'Imaging system installation',
      'Laboratory equipment setup',
      'Calibration and certification support'
    ],
    benefits: [
      'Minimal disruption to healthcare operations',
      'Precise calibration for accurate medical results',
      'Compliance with healthcare regulations',
      'Comprehensive staff training options'
    ]
  },
  {
    id: 'data-center-equipment-erection',
    title: 'Data Center Equipment Erection',
    description: 'Expert erection and installation of server racks, cooling systems, and critical IT infrastructure for data centers.',
    imageUrl: '/images/data-center.jpeg',
    features: [
      'Server rack erection and alignment',
      'Cooling system installation',
      'Cable management infrastructure',
      'Power distribution setup',
      'Environmental control system integration'
    ],
    benefits: [
      'Optimized data center layout for cooling efficiency',
      'Reduced risk of equipment failure',
      'Scalable infrastructure design',
      'Compliance with data center standards'
    ]
  },
  {
    id: 'factory-setup',
    title: 'Factory Setup & Installation',
    description: 'Comprehensive factory setup services including layout planning, equipment erection, and infrastructure integration.',
    imageUrl: '/images/factory-setup.jpeg',
    features: [
      'Factory layout optimization',
      'Complete production line erection',
      'Utility system integration',
      'Safety system implementation',
      'Workflow testing and validation'
    ],
    benefits: [
      'Turnkey solution for factory establishment',
      'Optimized production flow',
      'Reduced timeline for operational readiness',
      'Integrated systems approach'
    ]
  },
  {
    id: 'equipment-relocation',
    title: 'Equipment Relocation',
    description: 'Specialized services for dismantling, transporting, and re-erecting equipment to new locations.',
    imageUrl: '/images/equipment-erection.jpeg',
    features: [
      'Systematic equipment dismantling',
      'Secure packaging and transportation',
      'Professional re-erection at new location',
      'Recalibration and testing',
      'Minimal operational disruption'
    ],
    benefits: [
      'Reduced risk of equipment damage during moves',
      'Faster return to operational status',
      'Professional project management',
      'Comprehensive documentation of the process'
    ]
  }
];

export default function Services() {
  const { openServiceRequest } = useServiceRequest();
  const [selectedService, setSelectedService] = useState(services[0]);
  
  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 py-20 text-white">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold">Our Services</h1>
          <p className="mt-4 max-w-xl text-blue-100">
            SAI VINAYAKA ENTERPRISES offers a comprehensive range of equipment erection
            services tailored to meet the specific needs of various industries.
          </p>
        </div>
      </section>
      
      {/* Services Navigation */}
      <section className="py-8 bg-white border-b">
        <div className="container">
          <div className="flex flex-wrap gap-2">
            {services.map((service) => (
              <button
                key={service.id}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedService.id === service.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedService(service)}
              >
                {service.title}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Selected Service Detail */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Service Information */}
            <div>
              <h2 className="text-3xl font-bold mb-4">{selectedService.title}</h2>
              <p className="text-gray-700 mb-6">{selectedService.description}</p>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {selectedService.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Benefits</h3>
                <ul className="space-y-3">
                  {selectedService.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => openServiceRequest(selectedService.id)}
              >
                Request This Service <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            {/* Service Image */}
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-xl">
              <Image 
                src={selectedService.imageUrl}
                alt={selectedService.title} 
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Process Overview */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Service Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We follow a structured approach to deliver high-quality equipment erection services
              that meet your specific requirements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Consultation',
                description: 'We begin with a thorough consultation to understand your equipment erection needs and project requirements.'
              },
              {
                step: '02',
                title: 'Planning',
                description: 'Our team develops a detailed plan for your equipment erection project, including timeline, resources, and safety protocols.'
              },
              {
                step: '03',
                title: 'Execution',
                description: 'We carry out the equipment erection process with precision, following industry best practices and safety standards.'
              },
              {
                step: '04',
                title: 'Quality Assurance',
                description: 'Final testing and verification ensure your erected equipment meets all operational requirements and specifications.'
              }
            ].map((item, index) => (
              <div key={index} className="relative p-6 bg-white rounded-lg shadow-md border-t-4 border-blue-600">
                <div className="absolute -top-4 -right-4 bg-blue-600 text-white h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3 mt-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Industries We Serve */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Industries We Serve</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our equipment erection services cater to a diverse range of industries, each with unique requirements and specifications.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Manufacturing',
                description: 'Equipment erection for production lines, assembly stations, and factory automation systems.'
              },
              {
                title: 'Healthcare',
                description: 'Medical equipment erection services for hospitals, clinics, and diagnostic centers.'
              },
              {
                title: 'Technology',
                description: 'Data center equipment erection including server racks, cooling systems, and network infrastructure.'
              },
              {
                title: 'Heavy Industry',
                description: 'Erection of large-scale industrial equipment, machinery, and production systems.'
              },
              {
                title: 'Pharmaceutical',
                description: 'Specialized equipment erection for pharmaceutical manufacturing and laboratory environments.'
              },
              {
                title: 'Food & Beverage',
                description: 'Equipment erection for food processing, packaging, and production facilities.'
              }
            ].map((industry, index) => (
              <div key={index} className="p-6 bg-white rounded-lg border hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-3">{industry.title}</h3>
                <p className="text-gray-600">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Contact SAI VINAYAKA ENTERPRISES today to discuss your equipment erection needs. 
            Our team is ready to provide you with professional service and expert solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-900 hover:bg-blue-50"
              onClick={() => openServiceRequest()}
            >
              Request a Quote
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/10"
              onClick={() => window.location.href = '/contact'}
            >
              Contact Us <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
