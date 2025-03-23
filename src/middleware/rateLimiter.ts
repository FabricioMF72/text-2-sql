import { rateLimit } from "express-rate-limit";

export const rateLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hours window
    max: 4, // limit each IP to 4 requests per windowMs
    message: { error: 'You have exceeded the maximum number of attempts. Please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
  });
