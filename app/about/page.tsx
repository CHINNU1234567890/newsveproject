'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, CheckCircle2, Users, Clock, Shield, Award } from 'lucide-react';
import { useServiceRequest } from '@/contexts/ServiceRequestContext';
import { Button } from '@/components/ui/button';

export default function About() {
  const { openServiceRequest } = useServiceRequest();
  
  // Team members data
  const teamMembers = [
    {
      name: 'Leadership Team',
      role: 'Management',
      description: 'Our leadership team brings decades of combined experience in industrial equipment erection, with expertise across multiple sectors including manufacturing, healthcare, and data centers.'
    },
    {
      name: 'Technical Team',
      role: 'Field Operations',
      description: 'Our technical specialists are trained in the latest equipment erection methodologies and safety protocols, ensuring precise and efficient project execution.'
    },
    {
      name: 'Support Team',
      role: 'Customer Service',
      description: 'Our customer support team is available 24/7 to answer your questions and provide assistance throughout your equipment erection project.'
    }
  ];
  
  // Company values
  const companyValues = [
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: 'Safety First',
      description: 'We maintain rigorous safety standards in all our equipment erection projects to protect both our team and our clients.'
    },
    {
      icon: <Award className="h-8 w-8 text-blue-600" />,
      title: 'Quality Excellence',
      description: 'Our commitment to excellence ensures every equipment erection project meets or exceeds industry standards.'
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: 'Timely Delivery',
      description: 'We understand the importance of timeline adherence in equipment erection and work diligently to complete projects on schedule.'
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: 'Customer Satisfaction',
      description: 'We maintain close communication with clients throughout the equipment erection process, ensuring complete satisfaction.'
    }
  ];

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 py-20 text-white">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold">About Us</h1>
          <p className="mt-4 max-w-xl text-blue-100">
            SAI VINAYAKA ENTERPRISES was established in 2022 with a vision to provide
            exceptional equipment erection services across various industries.
          </p>
        </div>
      </section>
      
      {/* Company Overview */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                  Our Company
                </span>
              </h2>
              
              <p className="text-gray-700 mb-4">
                SAI VINAYAKA ENTERPRISES is a specialized equipment erection company
                serving industries, hospitals, data centers, and manufacturing facilities
                across India. With our headquarters in Secunderabad, we bring expertise and
                precision to every project we undertake.
              </p>
              
              <p className="text-gray-700 mb-4">
                Founded in 2022, our company has quickly established a reputation for excellence
                in the equipment erection sector. We combine technical expertise with a
                commitment to safety and quality to deliver outstanding results for our clients.
              </p>
              
              <p className="text-gray-700 mb-6">
                At SAI VINAYAKA ENTERPRISES, we pride ourselves on our ability to handle 
                complex equipment erection projects with precision and efficiency. Our team
                is available 24/7, 365 days a year to serve your equipment erection needs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => openServiceRequest()}
                >
                  Request Our Services
                </Button>
                <Link href="/contact">
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    Contact Us <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="/images/hero-image.jpeg"
                alt="SAI VINAYAKA ENTERPRISES team at work" 
                fill
                style={{ objectFit: 'contain', objectPosition: 'center' }}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our values guide every aspect of our equipment erection services,
              from initial planning to final implementation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyValues.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="mb-4 bg-blue-50 h-16 w-16 rounded-full flex items-center justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Expertise */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Expertise</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We specialize in a wide range of equipment erection services,
              catering to various industries and specific client needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Industrial Sector</h3>
              <ul className="space-y-3">
                {[
                  'Heavy machinery erection and installation',
                  'Production line setup and configuration',
                  'Industrial equipment relocation and setup',
                  'Factory infrastructure establishment'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Medical Sector</h3>
              <ul className="space-y-3">
                {[
                  'Medical equipment erection and calibration',
                  'Diagnostic machine installation',
                  'Laboratory equipment setup',
                  'Hospital infrastructure establishment'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Data Center Sector</h3>
              <ul className="space-y-3">
                {[
                  'Server rack erection and alignment',
                  'Cooling system installation',
                  'Network infrastructure setup',
                  'Security system integration'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Manufacturing Sector</h3>
              <ul className="space-y-3">
                {[
                  'Assembly line equipment erection',
                  'Manufacturing plant setup',
                  'Quality control system installation',
                  'Robotic system integration'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-16 bg-blue-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our experienced team of professionals is dedicated to providing exceptional 
              equipment erection services with precision and efficiency.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-4 mx-auto">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">{member.name}</h3>
                <p className="text-blue-600 text-center text-sm mb-4">{member.role}</p>
                <p className="text-gray-600 text-center">{member.description}</p>
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
