import Booking from "../models/Booking.js";
import Service from "../models/Service.js";
import Subcategory from "../models/Subcategory.js";
import sendEmail from "../utils/sendEmail.js";

// @desc    Create a new booking appointment
// @route   POST /api/bookings
// @access  Public
export const createBooking = async (req, res) => {
  console.log("===== BOOKING REQUEST RECEIVED =====");
  console.log(req.body);
  try {
    const {
      fullName,
      phone,
      email,
      location,
      serviceId,
      subcategoryId,
      preferredDate,
      preferredTimeSlot,
      notes,
    } = req.body;
    // Simple validation
    if (
      !fullName ||
      !phone ||
      !email ||
      !location ||
      !serviceId ||
      !subcategoryId ||
      !preferredDate ||
      !preferredTimeSlot
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }
    // Verify service and subcategory exist in DB
    const serviceExists = await Service.findById(serviceId);
    if (!serviceExists) {
      return res
        .status(404)
        .json({ message: "Selected service category does not exist" });
    }
    const subcategoryExists = await Subcategory.findById(subcategoryId);
    if (!subcategoryExists) {
      return res
        .status(404)
        .json({ message: "Selected subcategory does not exist" });
    }
    // Save booking
    const booking = new Booking({
      fullName,
      phone,
      email,
      location,
      serviceId,
      subcategoryId,
      preferredDate,
      preferredTimeSlot,
      notes,
    });
    const savedBooking = await booking.save();

//     await sendEmail(
//       "New Booking Received",
//       `
// <div style="font-family:Arial;padding:20px;background:#f4f4f4;">
//     <div style="background:white;padding:20px;border-radius:10px;max-width:700px;margin:auto;">
//         <h2 style="color:#0f766e;">New Booking Received</h2>

//         <table style="width:100%;border-collapse:collapse;table-layout:fixed;">
//             <tr>
//                 <td><strong>Name</strong></td>
//                 <td>${fullName}</td>
//             </tr>

//             <tr>
//                 <td><strong>Phone</strong></td>
//                 <td>${phone}</td>
//             </tr>

//             <tr>
//                 <td><strong>Email</strong></td>
//                 <td>${email}</td>
//             </tr>

//             <tr>
//                 <td><strong>Location</strong></td>
//                 <td>${location}</td>
//             </tr>

//             <tr>
//                 <td><strong>Service</strong></td>
//                 <td>${serviceExists.name}</td>
//             </tr>

//             <tr>
//                 <td><strong>Subcategory</strong></td>
//                 <td>${subcategoryExists.name}</td>
//             </tr>

//             <tr>
//                 <td><strong>Price</strong></td>
//                 <td>₹${subcategoryExists.price}</td>
//             </tr>

//             <tr>
//                 <td><strong>Date</strong></td>
//                 <td>${preferredDate}</td>
//             </tr>

//             <tr>
//                 <td><strong>Time</strong></td>
//                 <td>${preferredTimeSlot}</td>
//             </tr>

//             <tr>
//                 <td><strong>Notes</strong></td>
//                 <td>${notes || "-"}</td>
//             </tr>
//         </table>

//         <br>

//         <p style="color:gray;">
//             This booking was submitted from the Fixongo website.
//         </p>
//     </div>
// </div>
// `,
//     );
    await sendEmail(
      `🏠 New Booking | ${fullName} | ${preferredDate} | ${preferredTimeSlot}`,
      `
<div style="margin:0;padding:30px;background:#f4f7fa;font-family:Arial,sans-serif;">
  <div style="max-width:700px;margin:auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">

    <div style="background:#0f766e;padding:25px;text-align:center;">
      <h1 style="margin:0;color:#ffffff;font-size:30px;">
        🏠 Home Services
      </h1>
      <p style="margin-top:8px;color:#d1fae5;font-size:15px;">
        New Customer Booking Received
      </p>
    </div>

    <div style="padding:30px;">

      <p style="font-size:16px;color:#374151;">
        Hello,
      </p>

      <p style="font-size:16px;color:#374151;">
        A new customer has successfully booked a service through the
        <strong>Fixongo Home Services</strong> website.
      </p>

      <hr style="margin:25px 0;border:none;border-top:1px solid #e5e7eb;">

      <h2 style="color:#0f766e;margin-bottom:15px;">
        👤 Customer Details
      </h2>

      <table style="width:100%;border-collapse:collapse;">

        <tr>
          <td style="padding:10px;font-weight:bold;">Full Name</td>
          <td style="padding:10px;font-weight:bold;word-break:break-word;overflow-wrap:break-word;white-space:normal;">${fullName}</td>
        </tr>

        <tr style="background:#f9fafb;">
          <td style="padding:10px;font-weight:bold;">Phone Number</td>
          <td style="padding:10px;font-weight:bold;word-break:break-word;overflow-wrap:break-word;white-space:normal;">${phone}</td>
        </tr>

        <tr>
          <td style="padding:10px;font-weight:bold;">Email Address</td>
          <td style="padding:10px;font-weight:bold;word-break:break-word;overflow-wrap:break-word;white-space:normal;">${email}</td>
        </tr>

        <tr style="background:#f9fafb;">
          <td style="padding:10px;font-weight:bold;">Location</td>
          <td style="padding:10px;font-weight:bold;word-break:break-word;overflow-wrap:break-word;white-space:normal;">${location}</td>
        </tr>

      </table>

      <hr style="margin:25px 0;border:none;border-top:1px solid #e5e7eb;">

      <h2 style="color:#0f766e;margin-bottom:15px;">
        🛠️ Service Details
      </h2>

      <table style="width:100%;border-collapse:collapse;">

        <tr>
          <td style="padding:10px;font-weight:bold;">Category</td>
          <td style="padding:10px;font-weight:bold;word-break:break-word;overflow-wrap:break-word;white-space:normal;">${serviceExists.name}</td>
        </tr>

        <tr style="background:#f9fafb;">
          <td style="padding:10px;font-weight:bold;">Selected Service</td>
          <td style="padding:10px;font-weight:bold;word-break:break-word;overflow-wrap:break-word;white-space:normal;">${subcategoryExists.name}</td>
        </tr>

        <tr>
          <td style="padding:10px;font-weight:bold;">Service Price</td>
          <td style="padding:10px;font-weight:bold;word-break:break-word;overflow-wrap:break-word;white-space:normal;">₹${subcategoryExists.price}</td>
        </tr>

        <tr style="background:#f9fafb;">
          <td style="padding:10px;font-weight:bold;">Preferred Date</td>
          <td style="padding:10px;font-weight:bold;word-break:break-word;overflow-wrap:break-word;white-space:normal;">${preferredDate}</td>
        </tr>

        <tr>
          <td style="padding:10px;font-weight:bold;">Preferred Time Slot</td>
          <td style="padding:10px;font-weight:bold;word-break:break-word;overflow-wrap:break-word;white-space:normal;">${preferredTimeSlot}</td>
        </tr>

        <tr style="background:#f9fafb;">
          <td style="padding:10px;font-weight:bold;">Additional Notes</td>
          <td style="padding:10px;font-weight:bold;word-break:break-word;overflow-wrap:break-word;white-space:normal;">${notes || "No additional notes provided."}</td>
        </tr>

      </table>

      <div style="margin-top:30px;padding:18px;background:#ecfdf5;border-left:5px solid #10b981;border-radius:6px;">
        <strong>📞 Action Required</strong><br><br>
        Please contact the customer as soon as possible to confirm the booking and schedule the service.
      </div>

    </div>

    <div style="background:#111827;color:#d1d5db;text-align:center;padding:20px;">
      <h3 style="margin:0;color:#ffffff;">
        Fixongo Home Services
      </h3>

      <p style="margin-top:10px;font-size:14px;">
        Professional • Reliable • Affordable
      </p>

      <p style="margin-top:10px;font-size:12px;color:#9ca3af;">
        This is an automated booking notification generated by the Fixongo website.
      </p>
    </div>

  </div>
</div>
`,
    );
    // Respond with populated fields for response display if needed
    const populatedBooking = await Booking.findById(savedBooking._id)
      .populate("serviceId", "name icon")
      .populate("subcategoryId", "name price");
    res.status(201).json({
      success: true,
      message:
        "Your booking request has been submitted successfully. We will contact you shortly.",
      booking: populatedBooking,
    });
  } catch (error) {
    console.error("Booking Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while processing booking",
      error: error.message,
    });
  }
};
// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Public (In production this would require admin authorization, but we keep it simple as requested)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("serviceId", "name icon")
      .populate("subcategoryId", "name price")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching bookings",
      error: error.message,
    });
  }
};
