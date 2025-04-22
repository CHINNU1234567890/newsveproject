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

    // Send notification email to business
    const notificationSent = await sendNotificationEmail(formData);
    
    // Send confirmation email to customer
    const confirmationSent = await sendConfirmationEmail(formData);
    
    // Determine if the request was successful based on email sending results
    const success = notificationSent || confirmationSent;
    
    if (success) {
      return res.status(200).json({ 
        success: true, 
        message: 'Your message has been sent successfully.', 
        notificationSent, 
        confirmationSent 
      });
    } else {
      throw new Error('Failed to send emails.');
    }
    
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
      message: 'There was an error sending your message. Please try again or contact us directly.' 
    });
  }
}