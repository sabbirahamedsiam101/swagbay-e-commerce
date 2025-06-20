import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/products.routes.js";
import reviewRouter from "./routes/review.routes.js";
import categoryRouter from "./routes/category.routes.js";

dotenv.config();
// await connectDB();
// swagbay-e-commerce
// jKT5OmWHUkrJ0vpv
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://swagbay-e-commerce.vercel.app"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/api/auth", userRouter);
app.use("/api/products", productRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/categories", categoryRouter);

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await connectDB();
});
