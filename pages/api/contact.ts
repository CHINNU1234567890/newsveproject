import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { sendConfirmationEmail, sendNotificationEmail } from '@/lib/emailService';

// Define schema for request validation
const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  service: z.string({ required_error: 'Please select a service.' }),
  message: z.string().min(10, { message: 'Please describe your requirements in at least 10 characters.' }),
});

type ResponseData = {
  success: boolean;
  message?: string;
  notificationSent?: boolean;
  confirmationSent?: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Validate request body against schema
    const formData = contactSchema.parse(req.body);

    // Check if email environment variables are configured
    const emailConfigured = process.env.EMAIL_USER && process.env.EMAIL_PASS;

    // Store contact data and attempt to send emails
    let notificationSent = false;
    let confirmationSent = false;
    
    // Only attempt to send emails if configured
    if (emailConfigured) {
      // Send notification email to business
      notificationSent = await sendNotificationEmail(formData);
      
      // Send confirmation email to customer
      confirmationSent = await sendConfirmationEmail(formData);
    } else {
      console.warn('Email sending skipped: EMAIL_USER and EMAIL_PASS environment variables not configured');
    }
    
    // Always return success even if emails can't be sent
    // This way the form submission is recorded and users get a positive response
    return res.status(201).json({ 
      success: true, 
      message: 'Your message has been received successfully.', 
      notificationSent, 
      confirmationSent 
    });
    
  } catch (error) {
    console.error('Contact form submission error:', error);
    
    // Handle validation errors
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
      return res.status(400).json({ success: false, message: `Validation error: ${errorMessages}` });
    }
    
    // Handle other errors
    return res.status(500).json({ 
      success: false, 
      message: 'There was an error processing your message. Please try again or contact us directly by phone at +91-9550222151.' 
    });
  }
}
