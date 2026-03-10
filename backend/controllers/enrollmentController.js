import courseModel from "../models/courseModel.js";
import enrollmentModel from "../models/enrollmentModel.js";

export const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course id is required",
      });
    }

    const course = await courseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const alreadyEnrolled = await enrollmentModel.findOne({
      student: req.user._id,
      course: courseId,
    });

    if (alreadyEnrolled) {
      return res.status(400).json({
        success: false,
        message: "You are already enrolled in this course",
      });
    }

    const enrollment = await enrollmentModel.create({
      student: req.user._id,
      course: courseId,
    });

    res.status(201).json({
      success: true,
      message: "Enrolled successfully",
      enrollment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyCourses = async (req, res) => {
  try {
    const enrollments = await enrollmentModel
      .find({ student: req.user._id })
      .populate({
        path: "course",
        select: "title description price category",
        populate: {
          path: "instructor",
          select: "name email",
        },
      });

    res.status(200).json({
      success: true,
      total: enrollments.length,
      enrollments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const checkEnrollment = async (req, res) => {
  try {
    const { courseId } = req.params;

    const enrollment = await enrollmentModel.findOne({
      student: req.user._id,
      course: courseId,
    });

    res.status(200).json({
      success: true,
      enrolled: enrollment ? true : false,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
