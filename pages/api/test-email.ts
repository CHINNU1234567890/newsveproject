import { NextApiRequest, NextApiResponse } from 'next';
import { sendTestEmail } from '@/lib/emailService';

type ResponseData = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Extract receiver email from query parameter
  const { email } = req.query;
  
  // Check for valid email parameter
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ success: false, message: 'Valid email parameter is required' });
  }

  try {
    // Check for required environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(500).json({ 
        success: false, 
        message: 'Email service is not properly configured. Missing EMAIL_USER or EMAIL_PASS environment variables.' 
      });
    }

    // Send test email
    const emailSent = await sendTestEmail(email);
    
    if (emailSent) {
      return res.status(200).json({ 
        success: true, 
        message: `Test email successfully sent to ${email}` 
      });
    } else {
      throw new Error('Failed to send test email');
    }
    
  } catch (error) {
    console.error('Test email error:', error);
    
    // Return error response
    return res.status(500).json({ 
      success: false, 
      message: `Error sending test email: ${error instanceof Error ? error.message : 'Unknown error'}` 
    });
  }
}