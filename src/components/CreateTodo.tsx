import { useState, useEffect } from "react";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  Todo,
} from "../services/todo/api";

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const fetchedTodos = await getTodos();
      setTodos(fetchedTodos);
      setError(null);
    } catch (err) {
      setError("Failed to fetch todos");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    try {
      setIsLoading(true);
      const newTodo = await createTodo({
        title: newTodoTitle,
        description: newTodoDescription,
        completed: false,
      });

      setTodos([...todos, newTodo]);
      setNewTodoTitle("");
      setNewTodoDescription("");
    } catch (err) {
      setError("Failed to add todo");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleComplete = async (todo: Todo) => {
    try {
      setIsLoading(true);
      const updatedTodo = await updateTodo(todo.id!, {
        completed: !todo.completed,
      });

      setTodos(todos.map((t) => (t.id === todo.id ? updatedTodo : t)));
    } catch (err) {
      setError("Failed to update todo");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      setIsLoading(true);
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError("Failed to delete todo");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && todos.length === 0) {
    return <div>Loading todos...</div>;
  }

  return (
    <div>
      <h1>Todo List</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleAddTodo}>
        <div>
          <input
            type="text"
            placeholder="Todo title"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Todo description"
            value={newTodoDescription}
            onChange={(e) => setNewTodoDescription(e.target.value)}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Todo"}
        </button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            <div>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo)}
              />
              <strong>{todo.title}</strong>
            </div>
            <p>{todo.description}</p>
            <button onClick={() => handleDeleteTodo(todo.id!)}>Delete</button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && !isLoading && (
        <p>No todos yet. Add your first todo above!</p>
      )}
    </div>
  );
};

export default TodoList;
