/*import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

//REGISTER USER
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(500).json({ message: "User found" });
    }

    await newUser.save();

    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send(error.message);
  }
};

//LOGIN USER
const login = async (req, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.send(error.message);
    }
    const { email, password } = value;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.send("user not found, please register");
    }

    const correctPassword = bcrypt.compareSync(password, existingUser.password);
    if (!correctPassword) {
      return res.send("wrong password");
    }

    const token = jwt.sign({ id: existingUser.id }, "seeekey", {
      expiresIn: "30s",
    });

    res.cookie(String(existingUser.id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 30),
      httpOnly: true,
      sameSite: "lax",
    });

    return res.status(200).json({
      message: "successfully logged in",
      user: await User.findOne({ email }, "-password"),
      token: token,
    });
  } catch (error) {
    return res.send(error.message);
  }
};

const logout = async (req, res) => {
  const refreshToken = req.headers.cookie?.split('=')[1] || '';

  try {
    const decoded = jwt.verify(refreshToken, "seeekey");
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.clearCookie(user.id);

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid refresh token", error: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");

    return res.status(200).json({ message: "user retrieved succ", user: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { register, login, logout, getUser };*/
