import User from "../models/userModel.js";

const getUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");

    return res.status(200).json({ message: "user retrieved succ", user: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default getUser
