import mongoose from "mongoose";

const enrollmentSchema = mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  },
);

// prevent to enroll course twice
enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

const enrollmentModel =
  mongoose.models.Enrollment || mongoose.model("Enrollment", enrollmentSchema);

export default enrollmentModel;
