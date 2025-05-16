import axios, { AxiosInstance, AxiosResponse } from "axios";
import { useAuthStore } from "../../stores/authStore";

// Todo interfaces
export interface Todo {
  id?: string;
  title: string;
  description: string;
  completed: boolean;
  due_date?: Date;
  priority?: string;
  created_at?: Date;
  updated_at?: Date;
}

// Create a new axios instance
const createApiClient = (): AxiosInstance => {
  const { token } = useAuthStore.getState();

  return axios.create({
    baseURL: "http://localhost:3000/api/todo",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    timeout: 10000, // 10 seconds timeout
  });
};

// Get all todos for the logged-in user
export const getTodos = async (): Promise<Todo[]> => {
  try {
    const apiClient = createApiClient();
    const response: AxiosResponse<Todo[]> = await apiClient.get("/");
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

// Get a single todo by ID
export const getTodoById = async (id: string): Promise<Todo> => {
  try {
    const apiClient = createApiClient();
    const response: AxiosResponse<Todo> = await apiClient.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching todo ${id}:`, error);
    throw error;
  }
};

// Create a new todo
export const createTodo = async (
  todoData: Omit<Todo, "id" | "created_at" | "updated_at">
): Promise<Todo> => {
  try {
    const apiClient = createApiClient();
    const response: AxiosResponse<Todo> = await apiClient.post("/", todoData);
    return response.data;
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
};

// Update an existing todo
export const updateTodo = async (
  id: string,
  todoData: Partial<Todo>
): Promise<Todo> => {
  try {
    const apiClient = createApiClient();
    const response: AxiosResponse<Todo> = await apiClient.put(
      `/${id}`,
      todoData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating todo ${id}:`, error);
    throw error;
  }
};

// Delete a todo
export const deleteTodo = async (id: string): Promise<void> => {
  try {
    const apiClient = createApiClient();
    await apiClient.delete(`/${id}`);
  } catch (error) {
    console.error(`Error deleting todo ${id}:`, error);
    throw error;
  }
};
