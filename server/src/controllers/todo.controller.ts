import * as todoService from "../services/todo.services";
import { Request, Response } from "express";
export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, completed, description, due_date, priority } = req.body;
    const newTodo = todoService.createTodo({
      title,
      completed,
      description,
      due_date,
      priority,
      created_at: new Date(),
      updated_at: new Date(),
    });
    res.status(201).json(newTodo);
  } catch (error: unknown) {
    // Handle errors (e.g., validation errors from service)
    console.error("Error creating blog:", error); // Also log the specific error on the server
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create blog post";
    res.status(400).json({ message: errorMessage });
  }
};

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todo = todoService.getTodos();
    res.status(200).json(todo);
  } catch (error: unknown) {
    // Handle errors (e.g., validation errors from service)
    console.error("Error creating blog:", error); // Also log the specific error on the server
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create blog post";
    res.status(400).json({ message: errorMessage });
  }
};

export const getTodobyId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const todo = todoService.getPostbyId(id);
    res.status(200).json(todo);
  } catch (error: unknown) {
    // Handle errors (e.g., validation errors from service)
    console.error("Error creating blog:", error); // Also log the specific error on the server
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create blog post";
    res.status(400).json({ message: errorMessage });
  }
};

export const updateTodobyId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await todoService.updateTodobyId(id, data);
    res.status(201).json({ message: "Todo Updated Successfully" });
  } catch (error: unknown) {
    // Handle errors (e.g., validation errors from service)
    console.error("Error creating blog:", error); // Also log the specific error on the server
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create blog post";
    res.status(400).json({ message: errorMessage });
  }
};

export const deleteTodobyId = async (req:Request,res:Response)=>{
     try {
       const id = req.params.id;
       await todoService.deleteTodobyId(id);
       res.status(201).json({ message: "Deleted Successfuly" });
     } catch (error: unknown) {
       // Handle errors (e.g., validation errors from service)
       console.error("Error creating blog:", error); // Also log the specific error on the server
       const errorMessage =
         error instanceof Error ? error.message : "Failed to create blog post";
       res.status(400).json({ message: errorMessage });
     }
}