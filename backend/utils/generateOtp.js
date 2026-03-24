import crypto from "crypto";

export const generateOtp = () => {
  return crypto.randomInt(100000, 1000000).toString();
};

export const verifyOTP = (storedOTP, providedOTP) => {
  return crypto.timingSafeEqual(
    Buffer.from(storedOTP),
    Buffer.from(providedOTP),
  );
};
