'use client';

import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
//
// Service request form validation schema
const serviceRequestSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string()
    .length(10, { message: 'Phone number must be exactly 10 digits.' })
    .regex(/^[0-9]+$/, { message: 'Phone number can only contain digits.' }),
  service: z.string({ required_error: 'Please select a service.' }),
  message: z.string().min(10, { message: 'Please describe your requirements in at least 10 characters.' }),
});

type ServiceRequestFormValues = z.infer<typeof serviceRequestSchema>;

interface ServiceRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultService?: string;
}

export default function ServiceRequestDialog({ open, onOpenChange, defaultService }: ServiceRequestDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Initialize form
  const form = useForm<ServiceRequestFormValues>({
    resolver: zodResolver(serviceRequestSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: defaultService || '',
      message: '',
    },
  });
  
  // Update service field when defaultService changes
  useEffect(() => {
    if (defaultService) {
      form.setValue('service', defaultService);
    }
  }, [defaultService, form]);
  
  // Handle form submission
  const onSubmit = async (data: ServiceRequestFormValues) => {
    setIsSubmitting(true);
    let errorMessage = 'There was an error submitting your request. Please try again or call us directly at +91-9550222151.';
    
    try {
      // Log submission details
      console.log('Submitting to:', window.location.origin + '/api/contact');
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });
      
      console.log('Response status:', response.status);
      
      // Always attempt to parse response, but handle parse errors gracefully
      let result;
      try {
        result = await response.json();
        console.log('Form submission response:', result);
        
        // Store the error message if provided by the server
        if (result.message && !response.ok) {
          errorMessage = result.message;
        }
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        // If we can't parse the response, we'll use the default error message
      }
      
      if (response.ok) {
        setIsSuccess(true);
        form.reset();
        toast({
          title: 'Request submitted successfully',
          description: 'Thank you for your interest. We will contact you soon.',
        });
      } else {
        // Handle specific HTTP error codes
        if (response.status === 400) {
          // Validation error
          throw new Error(errorMessage || 'Please check your form inputs and try again.');
        } else if (response.status === 429) {
          // Rate limiting
          throw new Error('Too many requests. Please try again later.');
        } else if (response.status >= 500) {
          // Server error
          throw new Error('Our server is experiencing issues. Please try again later or contact us by phone: +91-9550222151');
        } else {
          // Other errors
          throw new Error(errorMessage);
        }
      }
    } catch (error: any) {
      console.error('Error sending service request:', error);
      
      // Display error message to user
      toast({
        title: 'Request failed to send',
        description: error.message || errorMessage,
        variant: 'destructive',
      });
      
      // Error UI indicator for better user feedback
      form.setError('root', { 
        type: 'server', 
        message: 'Form submission failed. Please try again or contact us by phone.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Reset success state when dialog is closed
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setIsSuccess(false);
    }
    onOpenChange(open);
  };
  
  // Service options
  const serviceOptions = [
    { value: 'heavy-equipment-erection', label: 'Heavy Equipment Erection' },
    { value: 'industrial-equipment-erection', label: 'Industrial Equipment Erection' },
    { value: 'medical-equipment-erection', label: 'Medical Equipment Erection' },
    { value: 'data-center-equipment-erection', label: 'Data Center Equipment Erection' },
    { value: 'factory-setup', label: 'Factory Setup & Installation' },
    { value: 'equipment-relocation', label: 'Equipment Relocation' },
    { value: 'other', label: 'Other Services' },
  ];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <DialogHeader className="bg-gradient-to-r from-blue-700 to-blue-800 text-white p-6">
          <DialogTitle className="text-xl font-bold">Request Our Services</DialogTitle>
          <DialogDescription className="text-blue-100">
            Tell us about your equipment erection needs, and our team will get back to you promptly.
          </DialogDescription>
          <button
            className="absolute top-4 right-4 rounded-full p-1 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </DialogHeader>
        
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-6">
              <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Request Submitted!</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Thank you for your interest in SAI VINAYAKA ENTERPRISES services. Our team will review your request and contact you shortly.
              </p>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => onOpenChange(false)}
              >
                Close
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Display global error message from form.formState.errors.root */}
                {form.formState.errors.root && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md mb-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm">{form.formState.errors.root.message}</p>
                        <p className="mt-1 text-xs">Please try again or contact us directly at +91-9550222151</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Your email address" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">+91</span>
                            <Input 
                              placeholder="Your phone number" 
                              className="pl-10" 
                              {...field} 
                              maxLength={10}
                              type="tel"
                              pattern="[0-9]{10}"
                              onKeyPress={(e) => {
                                // Allow only numbers (0-9)
                                if (!/[0-9]/.test(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Needed</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {serviceOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Details</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Please describe your equipment erection requirements, timeline, and any specific needs..."
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter className="pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => onOpenChange(false)}
                    className="mr-2"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </div>
                    ) : (
                      <>Submit Request</>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
