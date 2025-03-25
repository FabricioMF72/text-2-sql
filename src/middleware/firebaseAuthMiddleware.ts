import { Request, Response, NextFunction } from 'express';
import admin from '../config/firebaseAdmin';

export interface AuthenticatedRequest extends Request {
    user?: admin.auth.DecodedIdToken;
}

export const firebaseAuthMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        req.user = undefined; // No token provided, mark as unauthenticated
        next();
    } else {
        const token = authHeader.split(' ')[1];

        try {
            const decodedToken = await admin.auth().verifyIdToken(token);
            req.user = decodedToken; // Valid token, mark as authenticated
            next();
        } catch (error) {
            console.error('Token verification failed:', error);
            req.user = undefined; // Invalid token, treat as unauthenticated
            next();
        }
    }
};