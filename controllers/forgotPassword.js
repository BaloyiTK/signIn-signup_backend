import User from "../models/userModel.js";
import Joi from "joi";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const forgotPassword = async (req, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { email } = value;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User not found, please register" });
    }

    const token = jwt.sign(
      { email: existingUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRATION_RESET_LINK,
      }
    );

    // If no errors occur, send an email to the user
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_ADDRESS, // your email address
        pass: process.env.EMAIL_PASS, // your email password
      },
    });

    res.status(200).json({
      message:
        "Password reset link has been sent to your email. Please check your inbox and follow the instructions to reset your password.",
    });

    const resetLink = `${process.env.RESET_PASSWORD_URL}?token=${token}`;
    let currentDate = new Date();
    const message = {
      from: process.env.EMAIL_ADDRESS,
      to: existingUser.email,
      subject: "Password Reset Request",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Password Reset Request</title>
          </head>
          <body>
            <p>Dear ${existingUser.username},</p>
    
            <p>We received a request to reset your password for your account with us. To complete this process, please click on the link below to reset your password:</p>
    
            <p><a href="${resetLink}" target="_blank">Reset Password</a></p>
    
            <p>Please note that the link will expire in 1 hour, which is on ${new Date(
              currentDate.getTime() + 60 * 60 * 1000
            )}. If you do not reset your password within this time, you may need to request a new link.</p>
    
            <p>If you did not request a password reset, please ignore this message and contact us immediately if you suspect any unauthorized access to your account.</p>
    
            <p>Best regards,<br>[Your Company/Website Name]</p>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(message);
  } catch (error) {
    return res.status(error.message);
  }
};

export default forgotPassword;
