import express from "express";
import {
  forgotPassword,
  getMe,
  login,
  logout,
  register,
  resendOtp,
  resetPassword,
  verifyOtp,
} from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/resend-otp", resendOtp);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password", resetPassword);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/me", userAuth, getMe);

export default authRouter;
