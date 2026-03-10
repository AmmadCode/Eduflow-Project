import express from "express";
import userAuth from "../middleware/userAuth.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  getInstructorCourses,
  updateCourse,
} from "../controllers/courseController.js";

const courseRouter = express.Router();

courseRouter.post("/", userAuth, authorizeRoles("instructor"), createCourse);
courseRouter.get("/", getAllCourses);
courseRouter.get(
  "/my-courses",
  userAuth,
  authorizeRoles("instructor"),
  getInstructorCourses,
);
courseRouter.get("/:id", getCourseById);
courseRouter.put("/:id", userAuth, authorizeRoles("instructor"), updateCourse);
courseRouter.delete(
  "/:id",
  userAuth,
  authorizeRoles("instructor", "admin"),
  deleteCourse,
);

export default courseRouter;
