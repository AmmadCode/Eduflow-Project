import mongoose from "mongoose";
import enrollmentModel from "./enrollmentModel.js";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

courseSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function () {
    await enrollmentModel.deleteMany({ course: this._id });
  },
);

const courseModel =
  mongoose.models.Course || mongoose.model("Course", courseSchema);

export default courseModel;
