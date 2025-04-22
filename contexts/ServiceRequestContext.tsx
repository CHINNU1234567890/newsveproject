'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import ServiceRequestDialog from '@/components/ServiceRequestDialog';

interface ServiceRequestContextType {
  openServiceRequest: (defaultService?: string) => void;
  closeServiceRequest: () => void;
}

const ServiceRequestContext = createContext<ServiceRequestContextType | undefined>(undefined);

export const ServiceRequestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultService, setDefaultService] = useState<string | undefined>(undefined);

  const openServiceRequest = (service?: string) => {
    setDefaultService(service);
    setIsOpen(true);
  };

  const closeServiceRequest = () => {
    setIsOpen(false);
  };

  return (
    <ServiceRequestContext.Provider value={{ openServiceRequest, closeServiceRequest }}>
      {children}
      <ServiceRequestDialog 
        open={isOpen} 
        onOpenChange={setIsOpen} 
        defaultService={defaultService} 
      />
    </ServiceRequestContext.Provider>
  );
};

export const useServiceRequest = () => {
  const context = useContext(ServiceRequestContext);
  if (context === undefined) {
    throw new Error('useServiceRequest must be used within a ServiceRequestProvider');
  }
  return context;
};