import { Router } from "express";
import { handleGenerateSQL } from "../controllers/generateSQLController";
import { rateLimiter } from "../middleware/rateLimiter";
import { firebaseAuthMiddleware } from "../middleware/firebaseAuthMiddleware";

const router = Router();

router.post("/", firebaseAuthMiddleware, rateLimiter, handleGenerateSQL);

export default router;