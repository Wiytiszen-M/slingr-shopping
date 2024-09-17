import { Router } from "express";
import { addItem, getItems, deleteItem } from "../controllers/itemController";

const router = Router();

router.get("/items", getItems);
router.post("/items", addItem);
router.delete("/items/:id", deleteItem);

export default router;
