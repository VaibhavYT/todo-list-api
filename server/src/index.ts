import express, { Application } from "express";
import "./config/db.config";
import cors from "cors";
import todoRoutes from "./routes/todo.routes";
import userRoutes from "./routes/user.routes";
const app: Application = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/todo", todoRoutes);
app.use("/api/user", userRoutes);
// Start server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
