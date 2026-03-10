import mongoose from "mongoose";
import bcrypt from "bcrypt";
import enrollmentModel from "./enrollmentModel.js";
import courseModel from "./courseModel.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["student", "instructor", "admin"],
      default: "student",
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function () {
    await enrollmentModel.deleteMany({ student: this._id });
    const courses = await courseModel.find({ instructor: this._id });

    for (const course of courses) {
      await enrollmentModel.deleteMany({ course: course._id });
    }

    await courseModel.deleteMany({ instructor: this._id });
  },
);

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
