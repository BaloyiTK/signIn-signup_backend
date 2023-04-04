import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // limit each IP to 5 requests per windowMs
  message: "Too many login attempts. Please try again after an hour.",
  keyGenerator: function (req) {
    // Generate a unique key based on IP address

    return req.ip;
  },
});
export default loginLimiter;
