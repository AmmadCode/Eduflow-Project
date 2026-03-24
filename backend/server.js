import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import courseRouter from "./routes/courseRoutes.js";
import enrollRouter from "./routes/enrollmentRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import userRouter from "./routes/userRoutes.js";
const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://eduflow-project-murex.vercel.app",
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // 🔥 Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

const port = process.env.PORT || 3000;

// api endpoints
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/courses", courseRouter);
app.use("/api/enroll", enrollRouter);
app.use("/api/admin", adminRouter); // admin routes

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
