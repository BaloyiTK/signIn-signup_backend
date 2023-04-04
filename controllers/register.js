import bcrypt from "bcrypt";
import User from "../models/userModel.js"

const register = async (req, res) => {
 
 
  const { username, email, password } = req.body;
  const saltRounds = 10;
  
  try {

    const hashedPassword = await bcrypt.hash(password, saltRounds);
  
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    
    const savedUser = await newUser.save();
    return res.status(201).json({ message: "User created successfully", savedUser });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: `${email} already exist, please login` });
    } else {
      return res.status(500).json({ message: "Server error" ,error:error.message })
    }
  }
};

export default register;
