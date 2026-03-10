import courseModel from "../models/courseModel.js";
import enrollmentModel from "../models/enrollmentModel.js";

// instructor only
export const createCourse = async (req, res) => {
  try {
    const { title, description, category, price } = req.body;
    if (!title || !description || !category || !price) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }
    const course = await courseModel.create({
      title,
      description,
      category,
      price,
      instructor: req.user._id, // come from middleware
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all courses public
export const getAllCourses = async (req, res) => {
  try {
    const courses = await courseModel
      .find()
      .populate("instructor", "name email");

    res.status(200).json({ success: true, courses });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await courseModel
      .findById(id)
      .populate("instructor", "name email");
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await courseModel.findById(id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this course",
      });
    }
    const updatedCourse = await courseModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      updatedCourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await courseModel.findById(id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const isOwner = course.instructor.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this course",
      });
    }

    await course.deleteOne();

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getInstructorCourses = async (req, res) => {
  try {
    const courses = await courseModel
      .find({ instructor: req.user._id })
      .populate("instructor", "name email");

    const coursesWithCount = await Promise.all(
      courses.map(async (course) => {
        const enrollmentCount = await enrollmentModel.countDocuments({
          course: course._id,
        });
        return {
          ...course.toObject(),
          enrollmentCount,
        };
      }),
    );

    res.status(200).json({
      success: true,
      total: courses.length,
      courses: coursesWithCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
