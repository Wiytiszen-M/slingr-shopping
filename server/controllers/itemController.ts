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

export const addItem = async (req: Request, res: Response): Promise<void> => {
  const { name, description, quantity } = req.body;

  const errorMessage = validateItem(name, description, quantity);
  if (errorMessage) {
    res.status(400).json({ message: errorMessage });
    return;
  }

  try {
    const result = await pool.query(
      "INSERT INTO items (name, description, quantity) VALUES ($1, $2, $3) RETURNING *",
      [name, description, parseInt(quantity, 10)]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting item: ", error);
    res.status(500).json({ message: "Error inserting item" });
  }
};

const validateItem = (
  name: string,
  description: string,
  quantity: string
): string | null => {
  if (!name || !quantity) return "Faltan campos requeridos (name, quantity)";
  if (name.length > 25) return "El nombre no puede tener más de 25 caracteres";
  if (description && description.length > 100)
    return "La descripción no puede tener más de 100 caracteres";

  const parsedQuantity = parseInt(quantity, 10);
  if (isNaN(parsedQuantity) || parsedQuantity < 1 || parsedQuantity > 99) {
    return "La cantidad debe ser un número entre 1 y 99";
  }

  return null;
};
