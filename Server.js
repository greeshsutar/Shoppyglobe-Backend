import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./configure/User.configure.js";
import appRoutes from "./routes/Product.route.js"; // Import your updated router here!

dotenv.config();
const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());

// ⚡ MOUNT ALL ENDPOINTS AT THE ROOT URL LAYER
app.use("/", appRoutes);

// Fallback Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 5500;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running smoothly on port ${PORT}`));
});