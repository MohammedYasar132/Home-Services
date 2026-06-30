import express from "express";
import {
  createBooking,
  getAllBookings,
} from "../controllers/bookingController.js";
const router = express.Router();
// Create a booking request
router.post("/", createBooking);
// Fetch all bookings (useful for verification/inspection)
router.get("/", getAllBookings);
export default router;
