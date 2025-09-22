'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useServiceRequest } from '@/contexts/ServiceRequestContext';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const pathname = usePathname();
  const { openServiceRequest } = useServiceRequest();

  // Handle scroll effect for transparent header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Services dropdown items
  const services = [
    { name: 'Heavy Equipment Erection', href: '/services#heavy-equipment-erection' },
    { name: 'Industrial Equipment Erection', href: '/services#industrial-equipment-erection' },
    { name: 'Medical Equipment Erection', href: '/services#medical-equipment-erection' },
    { name: 'Data Center Equipment Erection', href: '/services#data-center-equipment-erection' },
    { name: 'Factory Setup & Installation', href: '/services#factory-setup' },
    { name: 'Equipment Relocation', href: '/services#equipment-relocation' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20 flex-wrap gap-x-2">
          {/* Logo */}
          <Link href="/" className="relative z-10 flex items-center">
            <div className="relative h-10 w-10 mr-2 lg:h-12 lg:w-12 lg:mr-3">
              <div className="bg-gradient-to-br from-blue-700 to-blue-500 h-full w-full rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm lg:text-lg">SVE</span>
              </div>
            </div>
            <div>
              <h1
                className={`font-bold text-lg lg:text-2xl ${
                  isScrolled ? 'text-blue-900' : 'text-white'
                }`}
              >
                SAI VINAYAKA
              </h1>
              <p
                className={`text-[10px] lg:text-xs font-medium ${
                  isScrolled ? 'text-blue-700' : 'text-blue-100'
                }`}
              >
                ENTERPRISES
              </p>
            </div>
          </Link>

          {/* Right side actions */}
          <div className="flex items-center gap-x-3">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              <NavLink href="/" active={pathname === '/'} isScrolled={isScrolled}>
                Home
              </NavLink>

              <div className="relative group">
                <button
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname?.startsWith('/services')
                      ? isScrolled
                        ? 'text-blue-600'
                        : 'text-white bg-white/20'
                      : isScrolled
                      ? 'text-gray-700 hover:text-blue-600'
                      : 'text-white/90 hover:text-white hover:bg-white/20'
                  }`}
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  Services
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>

                {/* Services Dropdown */}
                <div
                  className={`absolute left-0 mt-1 w-64 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all ${
                    isServicesOpen
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-95 pointer-events-none'
                  }`}
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <div className="py-1">
                    {services.map((service) => (
                      <Link
                        key={service.name}
                        href={service.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {service.name}
                      </Link>
                    ))}

                    <Link
                      href="/services"
                      className="block px-4 py-2 text-sm text-blue-600 font-medium border-t border-gray-100 hover:bg-blue-50"
                    >
                      View All Services
                    </Link>
                  </div>
                </div>
              </div>

              <NavLink href="/projects" active={pathname === '/projects'} isScrolled={isScrolled}>
                Projects
              </NavLink>

              <NavLink href="/about" active={pathname === '/about'} isScrolled={isScrolled}>
                About
              </NavLink>

              <NavLink href="/contact" active={pathname === '/contact'} isScrolled={isScrolled}>
                Contact
              </NavLink>

              <div className="ml-4 flex items-center space-x-3">
                <a
                  href="tel:+919550222151"
                  className={`hidden md:flex items-center text-sm font-medium ${
                    isScrolled ? 'text-blue-600' : 'text-white'
                  }`}
                >
                  <Phone className="h-4 w-4 mr-1.5" />
                  +91-9550222151
                </a>

                {/* Request Service button (desktop only) */}
                <Button
                  onClick={() => openServiceRequest()}
                  className="hidden lg:inline-flex bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Request Service
                </Button>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-x-3">
              <a
                href="tel:+919550222151"
                className={`flex items-center ${
                  isScrolled ? 'text-blue-600' : 'text-white'
                }`}
              >
                <Phone className="h-5 w-5" />
              </a>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-md ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-md transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col">
            <MobileNavLink href="/" active={pathname === '/'}>
              Home
            </MobileNavLink>

            <div>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-md"
              >
                <span>Services</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isServicesOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div className={`pl-4 space-y-1 ${isServicesOpen ? 'block' : 'hidden'}`}>
                {services.map((service) => (
                  <Link
                    key={service.name}
                    href={service.href}
                    className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>

            <MobileNavLink href="/projects" active={pathname === '/projects'}>
              Projects
            </MobileNavLink>

            <MobileNavLink href="/about" active={pathname === '/about'}>
              About
            </MobileNavLink>

            <MobileNavLink href="/contact" active={pathname === '/contact'}>
              Contact
            </MobileNavLink>
          </nav>
        </div>
      </div>

      {/* Overlay when mobile menu is open */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
}

// Desktop Navigation Link component
function NavLink({
  href,
  active,
  isScrolled,
  children,
}: {
  href: string;
  active: boolean;
  isScrolled: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
        active
          ? isScrolled
            ? 'text-blue-600'
            : 'text-white bg-white/20'
          : isScrolled
          ? 'text-gray-700 hover:text-blue-600'
          : 'text-white/90 hover:text-white hover:bg-white/20'
      }`}
    >
      {children}
    </Link>
  );
}

// Mobile Navigation Link component
function MobileNavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`px-4 py-3 rounded-md ${
        active ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      {children}
    </Link>
  );
}
