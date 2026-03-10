import express from "express";

import {
  changePassword,
  updateProfile,
} from "../controllers/userController.js";
import userAuth from "../middleware/userAuth.js";

const userRouter = express.Router();

userRouter.put("/profile", userAuth, updateProfile);
userRouter.put("/change-password", userAuth, changePassword);

export default userRouter;
