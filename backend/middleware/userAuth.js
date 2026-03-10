import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized login again" });
    }
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(tokenDecode.id);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized login again" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

export default userAuth;
