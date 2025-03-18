import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import generateSQLRoute from "./routes/generateSQL";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/generate-sql", generateSQLRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});