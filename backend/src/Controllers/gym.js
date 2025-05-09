const gym = require("../Models/Gym");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');



// ================== REGISTER ==================
exports.register = async (req, res) => {
  try {
    const { email, userName, password, profilePic, gymName } = req.body;

    // Check for existing user
    const existingUser = await gym.findOne({ userName });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists', success: false });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await gym.create({
      email,
      userName,
      password: hashedPassword,
      profilePic,
      gymName,
    });

    return res.status(201).json({
      message: 'User registered successfully',
      success: true,
      newUser
    });

  } catch (error) {
    console.error('Register Error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ================== LOGIN ==================
exports.login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Check if user exists
    const user = await gym.findOne({ userName });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ gym_id: user._id }, process.env.JWT_SECRETKEY, {
      expiresIn: '1d',
    });

    // Set cookie
    res.cookie('cookie_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    });

    // Return response
    const userData = {
      _id: user._id,
      email: user.email,
      userName: user.userName,
      gymName: user.gymName,
      profilePic: user.profilePic
    };

    return res.status(200).json({
      message: 'Logged in Successfully',
      success: true,
      token,
      user: userData
    });

  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};


// NodeMailer-related setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '', // add your Gmail
    pass: '', // app password
  },
});

// Send OTP
exports.sendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await gym.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const buffer = crypto.randomBytes(4);
    const token = (buffer.readUInt32BE(0) % 900000) + 100000;

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const mailOptions = {
      from: 'nitikshpal@gmail.com',
      to: email,
      subject: 'OTP Verification for Password Reset',
      text: `You requested an OTP for password reset. Your OTP is: ${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return res.status(500).json({ message: 'Failed to send OTP email' });
      res.status(200).json({ message: 'OTP sent to email successfully' });
    });
  } catch (error) {
    console.error('sendOTP Error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


//   CHECK OTP
exports.checkOTP = async (req, res) => {
  try {
    const { email, token } = req.body;

    const user = await gym.findOne({
      email,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP token' });
    }

    res.status(200).json({ success: true, message: 'OTP verified successfully' });
  } catch (error) {
    console.error('OTP Verification Error:', error);
    res.status(500).json({ success: false, message: 'An internal server error occurred' });
  }
};


// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword, email } = req.body;

    const user = await gym.findOne({
      email,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired reset token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ success: true, message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Reset Password Error:', error);
    res.status(500).json({ success: false, message: 'An internal server error occurred' });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("cookie_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'||"false",
    sameSite: 'strict',
  });

  return res.status(200).json({ message: "Logged out successfully" });
};
