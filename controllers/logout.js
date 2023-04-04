import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const logout = async (req, res) => {
  const refreshToken = req.headers.cookie?.split("=")[1] || "";

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.clearCookie(user.id);

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid refresh token", error: err.message })
  }
};

export default logout;
