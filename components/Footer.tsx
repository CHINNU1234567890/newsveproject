'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, ExternalLink, ChevronRight } from 'lucide-react';
import { FaWhatsapp, FaLinkedin } from 'react-icons/fa';
import { useServiceRequest } from '@/contexts/ServiceRequestContext';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const { openServiceRequest } = useServiceRequest();
  
  // Current year for copyright
  const currentYear = new Date().getFullYear();
  
  // Quick links
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];
  
  // Service links
  const services = [
    { name: 'Heavy Equipment Erection', href: '/services#heavy-equipment-erection' },
    { name: 'Industrial Equipment Erection', href: '/services#industrial-equipment-erection' },
    { name: 'Medical Equipment Erection', href: '/services#medical-equipment-erection' },
    { name: 'Data Center Equipment Erection', href: '/services#data-center-equipment-erection' },
    { name: 'Factory Setup & Installation', href: '/services#factory-setup' },
    { name: 'Equipment Relocation', href: '/services#equipment-relocation' },
  ];

  return (
    <footer className="bg-blue-900 text-white">
      {/* Pre-Footer CTA */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-700 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Ready to Start Your Project?</h2>
              <p className="mt-2 text-blue-100">
                Our experts are available 24/7 to assist with your equipment erection needs.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-white text-blue-800 hover:bg-blue-50"
                onClick={() => openServiceRequest()}
              >
                Request a Quote
              </Button>
              <Link href="/contact">
                <Button 
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Contact Us <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Footer */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Column 1: About */}
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 h-10 w-10 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">SVE</span>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-white">SAI VINAYAKA</h3>
                  <p className="text-xs font-medium text-blue-200">ENTERPRISES</p>
                </div>
              </div>
              
              <p className="text-sm text-blue-100 mb-6">
                Professional equipment erection services for industries, 
                hospitals, data centers, and manufacturing facilities since 2022.
              </p>
              
              <div className="flex space-x-3">
                <a 
                  href="https://wa.me/919550222151" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-800 hover:bg-blue-700 transition-colors h-9 w-9 rounded-full flex items-center justify-center"
                >
                  <FaWhatsapp className="h-4 w-4 text-white" />
                </a>
                <a 
                  href="https://www.linkedin.com/company/sai-vinayaka-enterprises" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-800 hover:bg-blue-700 transition-colors h-9 w-9 rounded-full flex items-center justify-center"
                >
                  <FaLinkedin className="h-4 w-4 text-white" />
                </a>
              </div>
            </div>
            
            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-blue-200 hover:text-white transition-colors flex items-center"
                    >
                      <ChevronRight className="h-3 w-3 mr-1" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Column 3: Our Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Our Services</h3>
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service.name}>
                    <Link 
                      href={service.href}
                      className="text-blue-200 hover:text-white transition-colors flex items-center"
                    >
                      <ChevronRight className="h-3 w-3 mr-1" />
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Column 4: Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Contact Information</h3>
              <ul className="space-y-4">
                <li className="flex">
                  <MapPin className="h-5 w-5 text-blue-300 mr-3 flex-shrink-0 mt-0.5" />
                  <address className="not-italic text-blue-100 text-sm">
                    5-3-171/22, RP ROAD,<br />
                    JEERA, SECUNDERABAD-500003,<br />
                    Telangana, India
                  </address>
                </li>
                
                <li className="flex">
                  <Phone className="h-5 w-5 text-blue-300 mr-3 flex-shrink-0" />
                  <a href="tel:+919550222151" className="text-blue-100 hover:text-white text-sm">
                    +91-9550222151
                  </a>
                </li>
                
                <li className="flex">
                  <Mail className="h-5 w-5 text-blue-300 mr-3 flex-shrink-0" />
                  <a href="mailto:saivinayakaenterprises13@gmail.com" className="text-blue-100 hover:text-white text-sm break-all">
                    saivinayakaenterprises13@gmail.com
                  </a>
                </li>
                
                <li className="flex">
                  <Clock className="h-5 w-5 text-blue-300 mr-3 flex-shrink-0 mt-0.5" />
                  <div className="text-blue-100 text-sm">
                    24/7 Service<br />
                    Available 365 days a year
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="border-t border-blue-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p className="text-blue-200 mb-4 md:mb-0">
              &copy; {currentYear} SAI VINAYAKA ENTERPRISES. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy-policy" className="text-blue-200 hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-blue-200 hover:text-white">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}