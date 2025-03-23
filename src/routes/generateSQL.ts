import { Router } from "express";
import { handleGenerateSQL } from "../controllers/generateSQLController";
import { rateLimiter } from "../middleware/rateLimiter";

const router = Router();

router.post("/", rateLimiter, handleGenerateSQL);

export default router;