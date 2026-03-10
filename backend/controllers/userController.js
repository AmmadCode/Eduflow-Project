import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";

export const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;

    const user = await userModel.findById(req.user._id).select("-password");

    user.name = name;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await userModel.findById(req.user._id).select("+password");
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Wrong password" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ success: true, message: "Password changed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
