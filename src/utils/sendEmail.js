const createTransporter = require('../config/email');

/**
 * Send Email
 * @param {Object} options - Email options
 */
const sendEmail = async options => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `${process.env.EMAIL_FROM}`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html || options.message,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Email error:', error.message);
    throw new Error('Email could not be sent');
  }
};

module.exports = sendEmail;
