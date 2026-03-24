import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: `"EduFlow" <${process.env.SMTP_EMAIL}>`,
      to,
      subject,
      html,
    });
    console.log("Email sent to:", to);
  } catch (error) {
    console.error("Email error:", error);
    throw new Error("Email send failed");
  }
};

export const sendOtpEmail = async (to, name, otp) => {
  await sendEmail(
    to,
    "Verify Your EduFlow Account",
    `<!DOCTYPE html>
    <html>
    <body style="background:#f8fafc;font-family:Arial;padding:40px;margin:0">
      <div style="background:white;border-radius:12px;padding:40px;max-width:480px;margin:0 auto">
        <h2 style="color:#0f172a;margin-bottom:8px">Verify Your Account 🎓</h2>
        <p style="color:#64748b">Hi ${name},</p>
        <p style="color:#64748b">Your EduFlow verification OTP is:</p>
        <div style="background:#f0fdf4;border-radius:8px;padding:20px;text-align:center;margin:20px 0">
          <h1 style="color:#059669;letter-spacing:8px;margin:0;font-size:36px">${otp}</h1>
        </div>
        <p style="color:#94a3b8;font-size:12px">Valid for 10 minutes. Do not share this OTP.</p>
        <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0">
        <p style="color:#94a3b8;font-size:11px">EduFlow — Learn Without Limits</p>
        <a style="margin-top:1rem;color:#0f172a" href="https://eduflow-project-murex.vercel.app/">Please visit ${name} our Website</a>
      </div>
    </body>
    </html>`,
  );
};

export const sendResetEmail = async (to, name, otp) => {
  await sendEmail(
    to,
    "Reset Your EduFlow Password",
    `<!DOCTYPE html>
    <html>
    <body style="background:#f8fafc;font-family:Arial;padding:40px;margin:0">
      <div style="background:white;border-radius:12px;padding:40px;max-width:480px;margin:0 auto">
        <h2 style="color:#0f172a;margin-bottom:8px">Reset Your Password 🔐</h2>
        <p style="color:#64748b">Hi ${name},</p>
        <p style="color:#64748b">Your password reset OTP is:</p>
        <div style="background:#fef2f2;border-radius:8px;padding:20px;text-align:center;margin:20px 0">
          <h1 style="color:#ef4444;letter-spacing:8px;margin:0;font-size:36px">${otp}</h1>
        </div>
        <p style="color:#94a3b8;font-size:12px">Valid for 10 minutes. If you didn't request this, ignore this email.</p>
        <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0">
        <p style="color:#94a3b8;font-size:11px">EduFlow — Learn Without Limits</p>
      </div>
    </body>
    </html>`,
  );
};
