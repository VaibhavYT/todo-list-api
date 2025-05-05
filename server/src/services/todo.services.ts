import { supabase } from "../config/db.config";

interface Todo {
  title: string;
  completed: boolean;
  description: string;
  due_date: Date;
  priority: string;
  created_at: Date;
  updated_at: Date;
}

export const createTodo = async (data: Todo) => {
  if (!data.title || !data.description) {
    throw new Error("Title and description are required");
  }
  const { data: todo, error } = await supabase
    .from("todos")
    .insert(data)
    .single();
  if (error) {
    throw error;
  } else {
    return todo;
  }
};

export const getTodos = async () => {
  const { data: todos, error } = await supabase.from("todos").select("*");
  if (error) throw error;
  return todos;
};

export const getPostbyId = async (id: number) => {
  const { data: todo, error } = await supabase
    .from("todos")
    .select("*")
    .eq("id", id)
    .single();

    if(error) throw error;
    return todo;
};

export const updateTodobyId = async (id: number, data: Partial<Todo>) => {
  const { data: todo, error } = await supabase
    .from("todos")
    .update(data)
    .eq("id", id)
    .single();
  if (error) {
    throw error;
  } else {
    return todo;
  }
};

export const deleteTodobyId = async (id: string) => {
  const { data: todo, error } = await supabase
    .from("todos")
    .delete()
    .eq("id", id)
    .single();
  if (error) {
    throw error;
  } else {
    return todo;
  }
};
