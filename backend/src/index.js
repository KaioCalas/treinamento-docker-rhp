import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);

const port = process.env.PORT || 3001;
app.listen(port, '0.0.0.0', () => {
  console.log(`API running on port ${port}`);
});
