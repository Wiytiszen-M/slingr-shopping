import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import itemRoutes from "./routes/itemRoutes";

dotenv.config();

const app: Application = express();
app.use(express.json());

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api", itemRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
