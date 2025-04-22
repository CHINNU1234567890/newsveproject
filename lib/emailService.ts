import nodemailer from 'nodemailer';
import { createTransport } from 'nodemailer';

/**
 * Creates a NodeMailer transporter configured with environment variables
 * Uses a more resilient approach for serverless environments with proper connection management
 */
function createTransporter() {
  // Check for required email configuration
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Email credentials are not configured. Set EMAIL_USER and EMAIL_PASS environment variables.');
  }

  // Create a transporter using SMTP
  const transporter = createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  return transporter;
}

interface EmailData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

/**
 * Sends notification email to the business owner
 * 
 * @param data Form data submitted by customer
 * @returns Promise<boolean> Success status
 */
export const sendNotificationEmail = async (data: EmailData): Promise<boolean> => {
  try {
    const transporter = createTransporter();
    
    // Email content to be sent to business
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'saivinayakaenterprises13@gmail.com', // Company email address
      subject: `New Service Request: ${data.service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #2563eb; margin-bottom: 20px;">New Service Request from ${data.name}</h2>
          
          <p style="margin-bottom: 20px;">You have received a new service request with the following details:</p>
          
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
            <p><strong>Service:</strong> ${data.service}</p>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Message:</strong><br>${data.message}</p>
          </div>
          
          <p style="color: #64748b; font-size: 14px;">
            This email was sent from your website's contact form. Please respond to the customer as soon as possible.
          </p>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending notification email:', error);
    return false;
  }
};

/**
 * Sends confirmation email to the customer
 * 
 * @param data Form data submitted by customer
 * @returns Promise<boolean> Success status
 */
export const sendConfirmationEmail = async (data: EmailData): Promise<boolean> => {
  try {
    const transporter = createTransporter();
    
    const serviceNames: {[key: string]: string} = {
      'heavy-equipment-erection': 'Heavy Equipment Erection',
      'industrial-equipment-erection': 'Industrial Equipment Erection',
      'medical-equipment-erection': 'Medical Equipment Erection',
      'data-center-equipment-erection': 'Data Center Equipment Erection',
      'factory-setup': 'Factory Setup & Installation',
      'equipment-relocation': 'Equipment Relocation',
      'other': 'Service Inquiry',
    };

    const serviceName = serviceNames[data.service] || 'Service Inquiry';
    
    // Email content to be sent to customer
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: data.email,
      subject: 'Thank You for Contacting SAI VINAYAKA ENTERPRISES',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #2563eb; margin-bottom: 5px;">Thank You for Reaching Out</h2>
            <p style="font-size: 16px; color: #475569;">We have received your request for ${serviceName}</p>
          </div>
          
          <p>Dear ${data.name},</p>
          
          <p>Thank you for contacting SAI VINAYAKA ENTERPRISES. We have received your request and our team will review it promptly.</p>
          
          <p>Here's a summary of the information you provided:</p>
          
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 4px; margin: 15px 0;">
            <p><strong>Service Requested:</strong> ${serviceName}</p>
            <p><strong>Message:</strong> ${data.message}</p>
          </div>
          
          <p>One of our representatives will contact you at ${data.phone} or ${data.email} to discuss your requirements in more detail.</p>
          
          <p>If you have any immediate questions, please feel free to call us at +91-9550222151.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <p style="margin-bottom: 5px;"><strong>SAI VINAYAKA ENTERPRISES</strong></p>
            <p style="margin-bottom: 5px; font-size: 14px; color: #64748b;">5-3-171/22, RP ROAD, JEERA, SECUNDERABAD-500003</p>
            <p style="margin-bottom: 5px; font-size: 14px; color: #64748b;">Phone: +91-9550222151</p>
            <p style="font-size: 14px; color: #64748b;">Email: saivinayakaenterprises13@gmail.com</p>
          </div>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return false;
  }
};

/**
 * Sends a test email to verify email configuration
 * 
 * @param receiverEmail Email address to receive test message
 * @returns Promise<boolean> Success status
 */
export const sendTestEmail = async (receiverEmail: string): Promise<boolean> => {
  try {
    const transporter = createTransporter();
    
    // Email content for test
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: receiverEmail,
      subject: 'Test Email from SAI VINAYAKA ENTERPRISES Website',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #2563eb; margin-bottom: 20px;">Email System Test</h2>
          
          <p>This is a test email to verify that the email system for SAI VINAYAKA ENTERPRISES website is working correctly.</p>
          
          <p>If you're receiving this email, it means the email configuration is successful.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <p style="margin-bottom: 5px;"><strong>SAI VINAYAKA ENTERPRISES</strong></p>
            <p style="font-size: 14px; color: #64748b;">This is an automated message, please do not reply.</p>
          </div>
        </div>
      `,
    };

    // Send the test email
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending test email:', error);
    return false;
  }
};