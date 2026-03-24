import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());

// ✅ REQUIRED CORS FIX
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://eduflow-project-murex.vercel.app",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

// routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/courses", courseRouter);
app.use("/api/enroll", enrollRouter);
app.use("/api/admin", adminRouter);

export default app;
