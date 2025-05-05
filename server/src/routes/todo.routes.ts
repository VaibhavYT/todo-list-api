import { Router } from "express";
import * as todoController from "../controllers/todo.controller";

const router = Router();

router.post("/", todoController.createTodo);
router.get("/", todoController.getTodos);
router.get("/:id", todoController.getTodobyId);
router.put("/:id", todoController.updateTodobyId);
router.delete("/:id", todoController.deleteTodobyId);

export default router;
