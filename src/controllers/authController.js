const asyncHandler = require('express-async-handler');
const crypto = require('crypto');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const sendEmail = require('../utils/sendEmail');

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please provide all fields');
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists with this email');
  }

  // Create user (password will be hashed automatically by pre-save middleware)
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    try {
      await sendEmail({
        email: user.email,
        subject: 'Welcome to Our E-Commerce Platform!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333;">Welcome ${user.name}! 🎉</h1>
            <p style="font-size: 16px; color: #555;">
              Thank you for registering with us. We're excited to have you on board!
            </p>
            <p style="font-size: 16px; color: #555;">
              You can now start shopping for amazing products.
            </p>
            <div style="margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL}" 
                 style="background-color: #007bff; color: white; padding: 12px 30px; 
                        text-decoration: none; border-radius: 5px; display: inline-block;">
                Start Shopping
              </a>
            </div>
            <p style="font-size: 14px; color: #888;">
              If you have any questions, feel free to contact our support team.
            </p>
          </div>
        `,
      });
    } catch (error) {
      console.error('Welcome email failed:', error.message);
    }

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide email and password');
  }

  const user = await User.findOne({ email }).select('+password');

  if (user && (await user.matchPassword(password))) {
    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        isActive: user.isActive,
        createdAt: user.createdAt,
      },
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      success: true,
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        avatar: updatedUser.avatar,
        token: generateToken(updatedUser._id),
      },
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error('Please provide an email');
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error('No user found with that email');
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  // Email content
  const message = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Password Reset Request</h2>
      <p style="font-size: 16px; color: #555;">
        You are receiving this email because you (or someone else) has requested 
        the reset of a password.
      </p>
      <p style="font-size: 16px; color: #555;">
        Please click the button below to reset your password:
      </p>
      <div style="margin: 30px 0;">
        <a href="${resetUrl}" 
           style="background-color: #007bff; color: white; padding: 12px 30px; 
                  text-decoration: none; border-radius: 5px; display: inline-block;">
          Reset Password
        </a>
      </div>
      <p style="font-size: 14px; color: #888;">
        This link will expire in 1 hour.
      </p>
      <p style="font-size: 14px; color: #888;">
        If you did not request this, please ignore this email and your password 
        will remain unchanged.
      </p>
    </div>
  `;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password Reset Request',
      html: message,
    });

    res.json({
      success: true,
      message: 'Email sent successfully. Please check your inbox',
    });
  } catch (error) {
    console.error('Password reset email error:', error);

    // If email fails, remove reset token
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    res.status(500);
    throw new Error('Email could not be Sent');
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;

  if (!password) {
    res.status(400);
    throw new Error('Please provide a new password');
  }

  if (password.length < 8) {
    res.status(400);
    throw new Error('Password must be at least 8 characters');
  }

  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');

  // Find user by token and check if not expired
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }, // Check if token not expired
  });

  if (!user) {
    res.status(400);
    throw new Error('Invalid or expired reset token');
  }

  // Set new password (will be hashed by pre-save middleware)
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  // Send confirmation email
  try {
    await sendEmail({
      email: user.email,
      subject: 'Password Reset Successful',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #28a745;">Password Reset Successful! ✅</h2>
          <p style="font-size: 16px; color: #555;">
            Your password has been successfully reset.
          </p>
          <p style="font-size: 16px; color: #555;">
            You can now login with your new password.
          </p>
          <div style="margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}/login" 
               style="background-color: #28a745; color: white; padding: 12px 30px; 
                      text-decoration: none; border-radius: 5px; display: inline-block;">
              Login Now
            </a>
          </div>
          <p style="font-size: 14px; color: #888;">
            If you did not make this change, please contact support immediately.
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Password reset confirmation email failed:', error.message);
  }

  res.json({
    success: true,
    message: 'Password reset successfully',
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    },
  });
});

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  forgotPassword,
  resetPassword,
};
