import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    const cookies = req.headers.cookie;

    if (!cookies) {
      return res.status(401).send("Unauthorized: No token provided");
    }

    const token = cookies.split("=")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      next();
    } catch (error) {
      return res.status(401).send("Unauthorized: Invalid token");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default verifyToken
