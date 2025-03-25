import { rateLimit } from "express-rate-limit";
import { AuthenticatedRequest } from "./firebaseAuthMiddleware";

export const rateLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hours window
    max: (req:AuthenticatedRequest) => (req.user ? 10 : 4), // 10 requests for authenticated users, 4 for unauthenticated
    keyGenerator: (req:AuthenticatedRequest) => req.user?.uid || req.ip || 'unknown', // Use user ID for authenticated users, IP for unauthenticated, fallback to 'unknown'
    message: { error: 'You have exceeded the maximum number of attempts. Please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});
