// File: backend/src/routes/users.js
import { Router } from "express";
import db from "../services/db.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name} = req.body;
    const { rows } = await db.query(
      "INSERT INTO users(name) VALUES($1) RETURNING *",
      [name]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
