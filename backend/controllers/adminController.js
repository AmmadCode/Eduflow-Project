import userModel from "../models/userModel.js";
import courseModel from "../models/courseModel.js";
import enrollmentModel from "../models/enrollmentModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");

    res.status(200).json({
      success: true,
      total: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    if (user._id.toString() === req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "you cannot delete your own account",
      });
    }

    await user.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAnalytics = async (req, res) => {
  try {
    const [
      totalUsers,
      totalStudents,
      totalInstructors,
      totalCourses,
      totalEnrollments,
    ] = await Promise.all([
      userModel.countDocuments(),
      userModel.countDocuments({ role: "student" }),
      userModel.countDocuments({ role: "instructor" }),
      courseModel.countDocuments(),
      enrollmentModel.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      analytics: {
        totalCourses,
        totalStudents,
        totalInstructors,
        totalUsers,
        totalEnrollments,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
