import * as userService from "../services/user.services";
import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const newUser = userService.createUser({
      name,
      email,
      password,
    });
    res.status(201).json(newUser);
  } catch (error: unknown) {
    // Handle errors (e.g., validation errors from service)
    console.error("Error creating user:", error); // Also log the specific error on the server
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create user";
    res.status(400).json({ message: errorMessage });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error: unknown) {
    // Handle errors (e.g., validation errors from service)
    console.error("Error getting users:", error); // Also log the specific error on the server
    const errorMessage =
      error instanceof Error ? error.message : "Failed to get users";
    res.status(400).json({ message: errorMessage });
  }
};

export const getUserbyId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = userService.getUserbyId(id);
    res.status(200).json(user);
  } catch (error: unknown) {
    // Handle errors (e.g., validation errors from service)
    console.error("Error getting user:", error); // Also log the specific error on the server
    const errorMessage =
      error instanceof Error ? error.message : "Failed to get user";
    res.status(400).json({ message: errorMessage });
  }
};

export const updateUserbyId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await userService.updateUserbyId(id, data);
    res.status(201).json({ message: "user updated Successfully" });
  } catch (error: unknown) {
    // Handle errors (e.g., validation errors from service)
    console.error("Error updating user:", error); // Also log the specific error on the server
    const errorMessage =
      error instanceof Error ? error.message : "Failed to update user";
    res.status(400).json({ message: errorMessage });
  }
};

export const deleteUserbyId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await userService.deleteUserbyId(id);
    res.status(201).json({ message: "User deleted" });
  } catch (error: unknown) {
    // Handle errors (e.g., validation errors from service)
    console.error("Error deleting user:", error); // Also log the specific error on the server
    const errorMessage =
      error instanceof Error ? error.message : "Failed to delete user";
    res.status(400).json({ message: errorMessage });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUser({ email, password });
    res.status(200).json(result);
  } catch (error: unknown) {
    console.error("Error logging in user:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to login user";
    res.status(401).json({ message: errorMessage });
  }
};
