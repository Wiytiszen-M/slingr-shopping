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
  if (!name || !quantity) return "Name and quantity are required.";
  if (name.length > 25) return "Name must be 25 characters max.";
  if (description && description.length > 100)
    return "Description must be 100 characters max.";

  const parsedQuantity = parseInt(quantity, 10);
  if (isNaN(parsedQuantity) || parsedQuantity < 1 || parsedQuantity > 99) {
    return "Quantity must be a number between 1 and 99.";
  }

  return null;
};

export const deleteItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (!id || isNaN(parseInt(id, 10))) {
    res.status(400).json({ message: "Invalid ID" });
    return;
  }

  try {
    const result = await pool.query(
      "DELETE FROM items WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      res.status(404).json({ message: "Item not found" });
    } else {
      res.status(200).json({ message: "Item deleted" });
    }
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Error trying to delete item" });
  }
};
