import { Request, Response } from "express";
import { generateSQL } from "../services/sqlGenerator";
import { validateRequest } from "../utils/schemaValidator";

export const handleGenerateSQL = async (req: Request, res: Response) => {
  const validationResult = validateRequest(req.body);
  if (!validationResult.success) {
    res.status(400).json({ error: validationResult.error.message });
  }

  try {
    const sqlQuery = await generateSQL(req.body.query, req.body.schema);
    res.json({ sql: sqlQuery });
  } catch (err) {
    res.status(500).json({ error: "Error generating SQL query" });
  }
};
