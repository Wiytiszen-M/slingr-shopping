import { Router } from "express";
import { addItem, getItems } from "../controllers/itemController";

const router = Router();

router.get("/items", getItems);
router.post("/items", addItem);

export default router;
