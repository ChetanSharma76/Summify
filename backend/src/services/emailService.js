import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendSummaryEmail = async (recipientEmail, summaryText, senderName = 'Summify User') => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: `${senderName} shared an AI Summary with you`,
      text: summaryText,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; font-weight: 700;">📑 Summify</h1>
            <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 16px;">${senderName} shared an AI summary with you</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px 20px; background: white;">
            <div style="background: #f8f9fa; padding: 25px; border-radius: 12px; border-left: 4px solid #667eea;">
              ${summaryText.split('\n').map(line => {
                if (!line.trim()) return '<br>';
                const boldText = line.replace(/\*\*(.*?)\*\*/g, '<strong style="color: #2d3748;">$1</strong>');
                return `<p style="margin: 0 0 15px 0; line-height: 1.6; color: #4a5568; font-size: 16px;">${boldText}</p>`;
              }).join('')}
            </div>
            
            <!-- CTA Button -->
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://your-summify-app.com" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; border-radius: 25px; text-decoration: none; font-weight: 600; display: inline-block;">
                Try Summify Now
              </a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #f1f5f9; padding: 20px; text-align: center; color: #64748b; font-size: 14px;">
            <p style="margin: 0;">Powered by <strong style="color: #667eea;">Summify</strong> - Your AI Document Summarizer</p>
            <p style="margin: 8px 0 0 0;">© 2025 Summify. All rights reserved.</p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
};
