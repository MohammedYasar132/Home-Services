import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (subject, html) => {
  await transporter.sendMail({
    from: `"Home Services" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject,
    html,
  });
};

export default sendEmail;
