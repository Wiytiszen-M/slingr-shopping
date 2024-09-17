import { Request, Response } from "express";
import pool from "../config/db";

export const getItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query("SELECT * FROM items");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching items", error);
    res.status(500).json({ message: "Error fetching items" });
  }
};
