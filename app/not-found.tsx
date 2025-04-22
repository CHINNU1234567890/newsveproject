'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useServiceRequest } from '@/contexts/ServiceRequestContext';

export default function NotFound() {
  const { openServiceRequest } = useServiceRequest();
  
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="container max-w-2xl mx-auto p-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Page Not Found</h2>
        
        <p className="text-gray-600 mb-8">
          Sorry, the page you are looking for doesn't exist or has been moved.
          Please check the URL or navigate back to the home page.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Back to Home
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
            onClick={() => openServiceRequest()}
          >
            Request a Service <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}