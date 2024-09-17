import { Pool } from "pg"; // Importar correctamente Pool desde pg
import dotenv from "dotenv"; // Importar dotenv correctamente

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
  console.log("Connected to the database");
});

export default pool;
