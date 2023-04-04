import { body, validationResult } from "express-validator";

const validateUserInput = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters long")
    .isAlphanumeric()
    .withMessage("Username must contain only letters and numbers"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6, max: 30 })
    .withMessage(`Password must be between 6 and 30 characters long`)
    .matches(/^[a-zA-Z0-9]{3,30}$/)
    .withMessage("Password must contain only letters and numbers"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
export default validateUserInput;
