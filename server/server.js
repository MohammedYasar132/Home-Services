import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import seedDatabase from "./config/seed.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
// Load environment variables
dotenv.config();
// Connect to Database
connectDB().then(() => {
  // Seed Database with initial services and subcategories if needed
  seedDatabase();
});
const app = express();
// Middleware
app.use(cors()); // Allow cross-origin requests from frontend (Port 5173)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static upload files if needed (placeholder for future upload requirements)
app.use("/uploads", express.static("uploads"));
// Health Check Route
app.get("/api/health", (req, res) => {
  res.json({
    status: "UP",
    message: "Servico Home Services Backend is running smoothly",
    timestamp: new Date(),
  });
});
// Routes
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
// Page Not Found (404) Route Handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Requested resource not found" });
});
// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.stack : {},
  });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
