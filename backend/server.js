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

// Connect to DB (skip in serverless if no connection)
try {
  connectDB();
} catch (e) {
  console.log("DB connection skipped for serverless:", e.message);
}

app.use(express.json());
app.use(cookieParser());

// CORS configuration for Vercel serverless
app.use(
  cors({
    origin: [
      "https://eduflow-project-murex.vercel.app",
      "http://localhost:4000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Origin",
      "X-Requested-With",
    ],
  }),
);

// Manual CORS headers for serverless compatibility
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (
    origin === "https://eduflow-project-murex.vercel.app" ||
    origin?.includes("localhost")
  ) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://eduflow-project-murex.vercel.app",
    );
  }
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );

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
