"use client";

import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20 flex-wrap gap-x-2">
          {/* Logo */}
          <Link href="/" className="relative z-10 flex items-center">
            <div className="relative h-10 w-10 mr-2 lg:h-12 lg:w-12 lg:mr-3">
              <div className="bg-gradient-to-br from-blue-700 to-blue-500 h-full w-full rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm lg:text-lg">
                  SVE
                </span>
              </div>
            </div>
            <div>
              <h1
                className={`font-bold text-lg lg:text-2xl ${
                  isScrolled ? "text-blue-900" : "text-white"
                }`}
              >
                Vcrazy VINAYAKA
              </h1>
              <p
                className={`text-[10px] lg:text-xs font-medium ${
                  isScrolled ? "text-blue-700" : "text-blue-100"
                }`}
              >
                ENTERPRISES
              </p>
            </div>
          </Link>

          {/* Right side actions */}
          <div className="flex items-center gap-x-3">
            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center space-x-1">
              <Link
                href="/about"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isScrolled
                    ? "text-gray-700 hover:text-blue-600"
                    : "text-white hover:text-blue-200"
                }`}
              >
                About
              </Link>
              <Link
                href="/services"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isScrolled
                    ? "text-gray-700 hover:text-blue-600"
                    : "text-white hover:text-blue-200"
                }`}
              >
                Services
              </Link>
              <Link
                href="/contact"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isScrolled
                    ? "text-gray-700 hover:text-blue-600"
                    : "text-white hover:text-blue-200"
                }`}
              >
                Contact
              </Link>

              {/* Request Service Button (disabled on mobile) */}
              <Button className="ml-4 hidden lg:inline-flex">Request Service</Button>
            </nav>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center gap-x-3">
              <a
                href="tel:+919550222151"
                className={`flex items-center ${
                  isScrolled ? "text-blue-600" : "text-white"
                }`}
              >
                <Phone className="h-5 w-5" />
              </a>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-md ${
                  isScrolled ? "text-gray-700" : "text-white"
                }`}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isScrolled ? "bg-white" : "bg-blue-600"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/about"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              About
            </Link>
            <Link
              href="/services"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              Services
            </Link>
            <Link
              href="/contact"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
