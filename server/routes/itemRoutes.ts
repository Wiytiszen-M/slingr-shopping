import { Router } from "express";
import { getItems } from "../controllers/itemController";

const router = Router();

router.get("/items", getItems);

export default router;
