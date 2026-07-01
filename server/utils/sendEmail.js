import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS ? "PASS FOUND" : "NO PASS");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (subject, html) => {
  await resend.emails.send({
    from: "Home Services <onboarding@resend.dev>",
    to: process.env.EMAIL_USER,
    subject,
    html,
  });
};

export default sendEmail;
