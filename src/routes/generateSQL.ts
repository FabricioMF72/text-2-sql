import { Router } from "express";
import { generateSQL } from "../services/sqlGenerator";
import { validateRequest } from "../utils/schemaValidator";

const router = Router();

router.post("/", async (req:any, res:any) => {
  const { error } = validateRequest(req.body);
  if (error) return res.status(400).json({ error: error.message });

  try {
    const sqlQuery = await generateSQL(req.body.query, req.body.schema);
    res.json({ sql: sqlQuery });
  } catch (err) {
    res.status(500).json({ error: "Error generating SQL query" });
  }
});

export default router;