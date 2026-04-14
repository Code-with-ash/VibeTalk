import nodemailer from "nodemailer";

export const sendOtpEmail = async (to, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Your App" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Your OTP Code",
      html: `
        <div style="font-family: Arial; text-align: center;">
          <h2>Your OTP Code</h2>
          <p>Use the following OTP to verify your account:</p>
          <h1 style="letter-spacing: 5px;">${otp}</h1>
          <p>This OTP will expire in 5 minutes.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log("OTP email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email not sent");
  }
};