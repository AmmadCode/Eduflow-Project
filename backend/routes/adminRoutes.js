import express from "express";
import userAuth from "../middleware/userAuth.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import {
  deleteUser,
  getAllUsers,
  getAnalytics,
} from "../controllers/adminController.js";

const adminRouter = express.Router();
// admin routes
adminRouter.get("/analytics", userAuth, authorizeRoles("admin"), getAnalytics); // specific routes
adminRouter.get("/", userAuth, authorizeRoles("admin"), getAllUsers);
adminRouter.delete("/:id", userAuth, authorizeRoles("admin"), deleteUser); // dynamic routes

export default adminRouter;
