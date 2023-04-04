import User from "../models/userModel.js";

const getUsers = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user.isAdmin) {
      return res.status(500).json({ message: "only admin can see all users" });
    }

    const users = await User.find();

    return res
      .status(200)
      .json({ message: "users retrieved succ", users: users });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default getUsers;
