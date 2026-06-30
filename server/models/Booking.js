import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please add your full name"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Please add a phone number"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email address"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Please select or add your location"],
      trim: true,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: [true, "Please select a service category"],
    },
    subcategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
      required: [true, "Please select a service subcategory"],
    },
    preferredDate: {
      type: Date,
      required: [true, "Please select a preferred date"],
    },
    preferredTimeSlot: {
      type: String,
      required: [true, "Please select a preferred time slot"],
    },
    notes: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);
const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
