'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { useServiceRequest } from '@/contexts/ServiceRequestContext';
import { Button } from '@/components/ui/button';

// No need to import images in Next.js App Router - they can be referenced directly

// Client types for rotating text
const clientTypes = [
  'Industries',
  'Hospitals',
  'Manufacturers',
  'Data Centers',
  'Factories'
];

export default function Home() {
  const { openServiceRequest } = useServiceRequest();
  const [currentClientType, setCurrentClientType] = useState(0);
  const [selectedClientType, setSelectedClientType] = useState(clientTypes[0]);

  // Rotate through client types every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentClientType((prev) => (prev + 1) % clientTypes.length);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Update featured content based on selected client type
  const getFeaturedContent = () => {
    switch (selectedClientType) {
      case 'Industries':
        return {
          title: 'Industrial Equipment Erection',
          description: 'Professional erection of heavy machinery and industrial equipment with precision and care.',
          features: [
            'Safe and efficient equipment erection',
            'Precision alignment and calibration',
            'Full compliance with industrial standards',
            'Expert handling of complex machinery'
          ],
          service: 'industrial-equipment-erection'
        };
        
      case 'Hospitals':
        return {
          title: 'Medical Equipment Erection',
          description: 'Specialized erection services for sensitive and complex medical equipment.',
          features: [
            'Clean room standards compliance',
            'Precision erection of diagnostic equipment',
            'Minimal disruption to healthcare facilities',
            'Calibration and testing included'
          ],
          service: 'medical-equipment-erection'
        };
        
      case 'Manufacturers':
        return {
          title: 'Manufacturing Equipment Erection',
          description: 'Complete production line and manufacturing equipment erection services.',
          features: [
            'Assembly line optimization',
            'Production equipment integration',
            'Robotic system erection',
            'Performance testing and validation'
          ],
          service: 'industrial-equipment-erection'
        };
        
      case 'Data Centers':
        return {
          title: 'Data Center Equipment Erection',
          description: 'Precise erection of sensitive server racks, cooling systems, and data infrastructure.',
          features: [
            'Server rack erection and alignment',
            'Cooling system integration',
            'Cable management infrastructure',
            'Environmental control system setup'
          ],
          service: 'data-center-equipment-erection'
        };
        
      case 'Factories':
        return {
          title: 'Factory Setup & Equipment Erection',
          description: 'Complete factory setup including heavy machinery erection and production line integration.',
          features: [
            'Turn-key factory setup solutions',
            'Equipment layout optimization',
            'Production workflow integration',
            'Safety system implementation'
          ],
          service: 'factory-setup'
        };
        
      default:
        return {
          title: 'Equipment Erection Services',
          description: 'Professional erection services for all types of industrial and commercial equipment.',
          features: [
            'Expert equipment handling',
            'Safety-first approach',
            '24/7 service availability',
            'Experienced technical team'
          ],
          service: 'heavy-equipment-erection'
        };
    }
  };

  const featuredContent = getFeaturedContent();

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center bg-gradient-to-r from-blue-900 to-blue-800 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero-image.jpg"
            alt="Industrial equipment erection" 
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          <div className="absolute inset-0 bg-blue-900/70"></div>
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Professional Equipment 
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white"> Erection </span> 
                Services
              </h1>
              
              <div className="h-10 mt-4">
                <h2 className="text-xl md:text-2xl font-medium">
                  Trusted by <span className="text-blue-300">{clientTypes[currentClientType]}</span> Since 2022
                </h2>
              </div>
              
              <p className="mt-4 text-blue-100 max-w-lg">
                SAI VINAYAKA ENTERPRISES delivers cutting-edge equipment erection services 
                with precision and expertise for all industrial, medical, and data center needs.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-900 hover:bg-blue-50"
                  onClick={() => openServiceRequest()}
                >
                  Request a Quote
                </Button>
                <Link href="/services">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-white text-white hover:bg-white/10"
                  >
                    Our Services <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="hidden lg:block">
              {/* This div is intentionally left empty for future content */}
            </div>
          </div>
        </div>
      </section>

      {/* Client Type Selection */}
      <section className="py-8 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {clientTypes.map((type) => (
              <div 
                key={type}
                className={`cursor-pointer p-4 rounded-lg text-center transition-all ${
                  selectedClientType === type 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedClientType(type)}
              >
                <h3 className="font-medium">{type}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Service */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">{featuredContent.title}</h2>
              <p className="text-gray-700 mb-6">{featuredContent.description}</p>
              
              <ul className="space-y-3 mb-8">
                {featuredContent.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => openServiceRequest(featuredContent.service)}
              >
                Request This Service
              </Button>
            </div>
            
            <div className="relative h-72 md:h-96 rounded-lg overflow-hidden shadow-lg">
              {/* Placeholder for future image */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center">
                <p className="text-white text-xl font-medium">Image Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose SAI VINAYAKA ENTERPRISES</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We deliver excellence in equipment erection with our experienced team, 
              advanced techniques, and commitment to safety and quality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Experienced Team',
                description: 'Our technicians have years of specialized experience in equipment erection across multiple industries.'
              },
              {
                title: '24/7 Availability',
                description: 'We provide round-the-clock service 365 days a year to meet your urgent equipment erection needs.'
              },
              {
                title: 'Safety Standards',
                description: 'We maintain the highest safety standards during all equipment erection and setup operations.'
              },
              {
                title: 'Comprehensive Service',
                description: 'From planning to final testing, we handle every aspect of your equipment erection project.'
              }
            ].map((item, index) => (
              <div key={index} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Contact us today to discuss your equipment erection needs. Our team is ready to 
            provide you with professional service and expert solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-900 hover:bg-blue-50"
              onClick={() => openServiceRequest()}
            >
              Request a Quote
            </Button>
            <Link href="/contact">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white/10"
              >
                Contact Us <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}