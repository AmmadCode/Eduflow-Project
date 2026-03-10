import express from "express";
import userAuth from "../middleware/userAuth.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import {
  checkEnrollment,
  enrollCourse,
  getMyCourses,
} from "../controllers/enrollmentController.js";

const enrollRouter = express.Router();

enrollRouter.post("/", userAuth, authorizeRoles("student"), enrollCourse);

enrollRouter.get(
  "/my-courses",
  userAuth,
  authorizeRoles("student"),
  getMyCourses,
);

enrollRouter.get("/check/:courseId", userAuth, checkEnrollment);

export default enrollRouter;
