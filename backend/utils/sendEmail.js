const nodemailer = require('nodemailer');

// Create transporter - works with Gmail and college emails
// Will only send if credentials are provided
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SMTP_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_SMTP_PORT || 587,
  secure: false, // Use TLS
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASSWORD || ''
  }
});

// Send welcome email - non-blocking (email failure won't stop registration)
async function sendWelcomeEmail(userEmail, username) {
  try {
    // Skip email if credentials not configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.warn(`⚠️ Email skipped for ${userEmail}: EMAIL_USER or EMAIL_PASSWORD not configured in .env`);
      return;
    }

    const mailOptions = {
      from: `Habit Health <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: '🎉 Welcome to Habit Health!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">Welcome to Habit Health! 🎯</h2>
          
          <p>Hi <strong>${username}</strong>,</p>
          
          <p style="font-size: 16px; color: #333;">Greetings from <strong>Shrivarshan</strong>!</p>
          
          <p>Thank you for joining <strong>Habit Health</strong>! We're excited to have you on board.</p>
          
          <p>With Habit Health, you can:</p>
          <ul style="color: #666;">
            <li>✅ Track your daily habits effortlessly</li>
            <li>✅ Build streaks and maintain consistency</li>
            <li>✅ Monitor your progress with analytics</li>
            <li>✅ Stay motivated towards your goals</li>
          </ul>
          
          <p style="margin-top: 30px;">Start by creating your first habit and begin your journey to personal growth today!</p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <h3 style="color: #6366f1; margin-top: 20px;">📧 Feedback & Support</h3>
          <p style="color: #666;">If you face any issues or have warm feedback to share, please reach out to us at:</p>
          <p style="background: #f5f5f5; padding: 15px; border-radius: 5px; text-align: center;">
            <strong>📬 sit19cs102@sairamtap.edu.in</strong>
          </p>
          <p style="color: #666;">We'd love to hear from you and help make your experience better!</p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <p style="margin-top: 30px; color: #999;">
            <strong>Best regards,</strong><br>
            Shrivarshan<br>
            Habit Health Team
          </p>
          
          <p style="font-size: 12px; color: #999; text-align: center;">
            © 2026 Habit Health. All rights reserved.
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Welcome email sent to ${userEmail}`);
  } catch (error) {
    // Log error but don't throw - email failure won't block registration
    console.warn(`⚠️ Email failed for ${userEmail}: ${error.message}`);
  }
}

module.exports = { sendWelcomeEmail };
