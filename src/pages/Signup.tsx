import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import {createUser}  from "../services/user/api";
type FormValues = {
  name: string;
  email: string;
  password: string;
};

const Signup = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(false);
    setError(null);
    setSuccessMessage(null);
    try {
      const userDatatosend = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      const newUser = await createUser(userDatatosend);
      console.log("Blog Created:", newUser);
      setSuccessMessage("User has been created");
      reset();
    } catch (error) {
      console.log("Failed to Create Blog", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      {error && <p style={{ color: "red" }}>Error:{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Name</label>
            <input {...register("name")} />
          </div>
          <div>
            <label htmlFor="email">Email</label>newUser
            <input {...register("email")} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input {...register("password")} />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Creating" : "Create User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
