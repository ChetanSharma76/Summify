import { sendSummaryEmail } from '../services/emailService.js';

export const shareEmail = async (req, res) => {
  try {
    const { recipientEmail, summaryText, senderName, senderEmail } = req.body;

    // Validation
    if (!recipientEmail || !summaryText) {
      return res.status(400).json({ 
        success: false,
        error: 'Recipient email and summary text are required' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(recipientEmail)) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid email address'
      });
    }

    // Send email
    const result = await sendSummaryEmail(
      recipientEmail,
      summaryText,
      senderName || senderEmail || 'Anonymous User'
    );

    if (result.success) {
      res.status(200).json({
        success: true,
        message: 'Summary shared successfully!',
        messageId: result.messageId
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to send email. Please try again.'
      });
    }
  } catch (error) {
    console.error('Share email error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error. Please try again later.'
    });
  }
};

export const testShareRoute = (req, res) => {
  res.json({ message: 'Share routes working!' });
};
