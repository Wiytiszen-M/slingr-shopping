import { Router } from "express";
import {
  addItem,
  getItems,
  deleteItem,
  updateItem,
} from "../controllers/itemController";

const router = Router();

router.get("/items", getItems);
router.post("/items", addItem);
router.delete("/items/:id", deleteItem);
router.put("/items/:id", updateItem);

export default router;
