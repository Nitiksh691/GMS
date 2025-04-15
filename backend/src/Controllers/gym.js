const GymUser = require("../Models/Gym");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');



// ================== REGISTER ==================
exports.register = async (req, res) => {
  try {
    const { email, userName, password, profilePic, gymName } = req.body;

    // Check for existing user
    const existingUser = await GymUser.findOne({ userName });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists', success: false });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await GymUser.create({
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
    const user = await GymUser.findOne({ userName });
    console.log("User found:", user);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ gym_id: user._id }, process.env.JWT_SECRETKEY, {
      expiresIn: '1d',
    });

    res.cookie('cookie_token', token, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      message: 'Logged in Successfully',
      success: true,
      token,
      user
    });

  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};


//   RESET-PASSWORD
exports.sendResetLink = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await GymUser.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Generate token and expiry
      const resetToken = crypto.randomBytes(32).toString('hex');
      const tokenExpiry = Date.now() + 3600000; // 1 hour
  
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = tokenExpiry;
      await user.save();
  
      // Setup mail transport
      const transporter = nodemailer.createTransport({
        service: 'gmail', // or any other email provider
        auth: {
          user: 'your-email@gmail.com',
          pass: 'your-app-password', // use App Password if 2FA is on
        },
      });
  
      const resetURL = `http://localhost:3000/reset-password/${resetToken}`;
  
      await transporter.sendMail({
        to: email,
        subject: 'Password Reset',
        html: `<p>Click the link to reset your password:</p>
               <a href="${resetURL}">${resetURL}</a>`,
      });
  
      res.status(200).json({ message: 'Password reset link sent to email' });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
};

//   CHECK OTP
  exports.checkOTP = async (req, res) => {
    try {
      const { email, token } = req.body;
  
      // Find user with matching token and check token expiry
      const user = await GymUser.findOne({
        email,
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
      });
  
      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'Invalid or expired OTP token'
        });
      }
  
      return res.status(200).json({
        success: true,
        message: 'OTP verified successfully'
      });
  
    } catch (error) {
      console.error('OTP Verification Error:', error);
      return res.status(500).json({
        success: false,
        message: 'An internal server error occurred'
      });
    }
};

// RESET----PASSWORD
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Find user by token and check if token is still valid
    const user = await GymUser.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token',
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset token fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Password has been reset successfully',
    });

  } catch (error) {
    console.error('Reset Password Error:', error);
    return res.status(500).json({
      success: false,
      message: 'An internal server error occurred',
    });
  }
};

exports.logout = async (req,res) => {
  res.clearCookie("cookie_token",token, {
    httpOnly: true,
    secure: false, // true in production
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000
  }).json({message:"You are Logged out Mf!!"})
}

