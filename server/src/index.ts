import express, { Application } from "express";
import dotenv from "dotenv";

import "./config/db.config";
import cors from "cors";
import todoRoutes from "./routes/todo.routes";

const app: Application = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/todo",todoRoutes);

// Start server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
