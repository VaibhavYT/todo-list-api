import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login";
import Signup from "../pages/Signup";
import TodoList from "../components/CreateTodo";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<TodoList />} />
        <Route path="/" element={<TodoList />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
