import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const refreshToken = async (req, res, next) => {
  const cookies = req.headers.cookie;

  if (!cookies) {
    return res.status(401).json({ message: "Missing refresh token" });
  }
  const refreshToken = cookies.split("=")[1];

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "30s",
    });

    res.cookie(String(user.id), accessToken, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 30),
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    });
    req.user = user.id;
    next();
  } catch (err) {
    return res
      .status(401)
      
      .json({ message: "Invalid refresh token", error: err.message });
  }
};

export default refreshToken;
