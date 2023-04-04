import User from "../models/userModel.js";
import Joi from "joi";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

const resetPassword = async (req, res) => {
  try {
    const schema = Joi.object({
      password: Joi.string().required().min(6),
      confirmPassword: Joi.string().required().valid(Joi.ref("password")),
    });

    const token = req.query.token;

    if (!token) {
      return res.status(400).json({ message: "Invalid token" });
    }

    let decodedToken;
    const resetLink = "http://localhost:3000/forgot-password";

    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Your password reset link has expired.",
          link: "http://localhost:3000/forgot-password"
        });
        
        


      }
      throw error;
    }

    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { password, confirmPassword } = value;

    const existingUser = await User.findOne({ email: decodedToken.email });

    if (!existingUser) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    existingUser.password = hashedPassword;

    await existingUser.save();

    // Send email to the user
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_ADDRESS, // your email address
        pass: process.env.EMAIL_PASS, // your email password
      },
    });

    const message = {
      from: process.env.EMAIL_ADDRESS, // sender address
      to: existingUser.email, // list of receivers
      subject: "Your Password Has Been Successfully Reset", // Subject line
      text: "Please reset your password using the link below", // plain text body
      html: `<p>Dear ${existingUser.username}, <br/><br/>

      This is a confirmation that your password for [Your Application Name] has been successfully reset. If you did not request a password reset, please contact our support team immediately at [Your Support Email].
      
      Date and Time of Reset: [Insert Date and Time]
      
      If you did initiate this password reset, please log in to your account using your new password as soon as possible. We recommend that you change your password again to a unique and secure password that you haven't used before.
      
      If you have any questions or concerns about this password reset, please don't hesitate to contact our support team. We're here to help.
      
      Thank you for choosing [Your Application Name],
      
      [Your Company Name]</p> `, // html body
    };

    await transporter.sendMail(message);

    res.status(200).json({ message: "Password reset successful" });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default resetPassword;
