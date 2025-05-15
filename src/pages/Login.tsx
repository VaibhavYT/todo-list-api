import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { loginUser } from "../services/user/api";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";
type FormValues = {
  email: string;
  password: string;
};

export const Login = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  // Auth store and navigation
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(false);
    setError(null);
    setSuccessMessage(null);

    try {
      const userDataToSend = {
        email: data.email,
        password: data.password,
      };

      const response = await loginUser(userDataToSend);

       // Store token and user data
      if (response.token) {
        login(response.token, response.user)
        setSuccessMessage('Logged in successfully')
        
        // Redirect after successful login
        setTimeout(() => {
          navigate('/dashboard') // Or any protected route
        }, 1000) // Short delay to show success message
      } else {
        setError('Invalid login response')
      }
      console.log(login, "logged in");
      setSuccessMessage("Logged in");
      reset();
    } catch (error) {
      console.log("failed to loggin ", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h2>Create New Blog</h2>
      {error && <p style={{ color: "red" }}>Error:{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input {...register("email")} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input {...register("password")} />
        </div>
        <button type="submit">{isLoading ? "Logging in..." : "Log In"}</button>
      </form>
    </div>
  );
};
