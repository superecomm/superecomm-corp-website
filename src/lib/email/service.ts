/**
 * Email Service for Gridnet
 * 
 * BACKEND INTEGRATION REQUIRED:
 * This is a client-side stub. In production, emails should be sent from your backend using:
 * - SendGrid (npm install @sendgrid/mail)
 * - Resend (npm install resend)
 * - AWS SES
 * - Or Firebase Extensions (Trigger Email)
 * 
 * ENVIRONMENT VARIABLES:
 * SENDGRID_API_KEY=SG.xxx (if using SendGrid)
 * RESEND_API_KEY=re_xxx (if using Resend)
 * EMAIL_FROM=noreply@superecomm.com
 */

export interface ReservationConfirmationEmailData {
  toEmail: string;
  displayName?: string;
  gridAccountId: string;
  amount: number;
  reservedAt: Date;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Send reservation confirmation email
 * 
 * In production, this calls your backend API which sends the actual email
 */
export async function sendReservationConfirmationEmail(
  data: ReservationConfirmationEmailData
): Promise<EmailResult> {
  // TODO: Replace with your actual backend API endpoint
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
  
  try {
    const response = await fetch(`${API_URL}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'reservation_confirmation',
        to: data.toEmail,
        data: {
          displayName: data.displayName || 'Grid Member',
          gridAccountId: data.gridAccountId,
          amount: data.amount,
          reservedAt: data.reservedAt.toISOString(),
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    const result = await response.json();
    return {
      success: true,
      messageId: result.messageId,
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * STUB: Log email to console (FOR DEVELOPMENT)
 * 
 * In development, we just log what email would be sent
 */
export function logEmailToConsole(data: ReservationConfirmationEmailData): void {
  console.log('\n📧 ═══════════════════════════════════════════════════════');
  console.log('   GRIDNET - RESERVATION CONFIRMATION EMAIL');
  console.log('═══════════════════════════════════════════════════════\n');
  console.log(`To: ${data.toEmail}`);
  console.log(`Subject: Your Gridnet Account Reservation is Confirmed\n`);
  console.log('Body:');
  console.log('─────────────────────────────────────────────────────────');
  console.log(`Hello ${data.displayName || 'Grid Member'},\n`);
  console.log('🎉 Welcome to Gridnet!\n');
  console.log(`Your Gridnet account reservation is confirmed.\n`);
  console.log(`Grid Account ID: ${data.gridAccountId}`);
  console.log(`Reservation Amount: $${(data.amount / 100).toFixed(2)}`);
  console.log(`Reserved At: ${data.reservedAt.toLocaleString()}\n`);
  console.log('What this means:');
  console.log('✓ Your $10 reservation is refundable');
  console.log('✓ This converts to $10 usage credit when metering launches');
  console.log('✓ You\'re a Founding Member of Gridnet');
  console.log('✓ You\'ll get early access to metered AI ("AI on tap")\n');
  console.log('Dashboard: https://superecomm.com/dashboard');
  console.log('Website: https://superecomm.com\n');
  console.log('Questions? Reply to this email or visit our support page.\n');
  console.log('Best regards,');
  console.log('The Super eComm Team');
  console.log('Building the AI Utility Grid');
  console.log('═══════════════════════════════════════════════════════\n');
}

/**
 * Send welcome email (stub for now)
 */
export async function sendWelcomeEmail(
  email: string,
  displayName?: string
): Promise<EmailResult> {
  console.log(`📧 Would send welcome email to: ${email} (${displayName})`);
  
  return {
    success: true,
    messageId: `stub_${Date.now()}`,
  };
}

/**
 * EXAMPLE BACKEND CODE (Node.js + SendGrid):
 * 
 * import sgMail from '@sendgrid/mail';
 * 
 * sgMail.setApiKey(process.env.SENDGRID_API_KEY);
 * 
 * export async function sendReservationEmail(data) {
 *   const msg = {
 *     to: data.toEmail,
 *     from: 'noreply@superecomm.com',
 *     subject: 'Your Gridnet Account Reservation is Confirmed',
 *     text: `Welcome! Your Grid ID: ${data.gridAccountId}`,
 *     html: generateEmailHTML(data), // Create a nice HTML template
 *   };
 *   
 *   await sgMail.send(msg);
 * }
 */

