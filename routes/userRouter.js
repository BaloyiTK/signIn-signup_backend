import express from "express";
import getUser from "../controllers/getUser.js";
import getUsers from "../controllers/getUsers.js";
import login from "../controllers/login.js";
import logout from "../controllers/logout.js";
import register from "../controllers/register.js";
import resetPassword from "../controllers/resetPassword.js";
import forgotPassword from "../controllers/forgotPassword.js";
import validateUserInput from "../middlewares/inputValidatorMiddleware.js";
import loginLimiter from "../middlewares/loginLimitterMiddleware.js";
import refreshToken from "../middlewares/refreshTokenMiddleware.js";
import verifyToken from "../middlewares/verifyTokenMiddleware.js";

const router = express.Router();

router.post("/register", validateUserInput, register);
router.post("/login", loginLimiter, login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword);
router.get("/user", verifyToken, getUser);
router.get("/users", verifyToken, getUsers);
router.get("/refresh", refreshToken, verifyToken, getUser)

export default router;
