import { supabase } from "../config/db.config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface User {
  name: string;
  email: string;
  password: string;
}

export const createUser = async (data: User) => {
  if (!data || !data.email || !data.password || !data.name) {
    throw new Error("Name, email, and password are required");
  }
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const { data: user, error } = await supabase
    .from("users")
    .insert({ ...data, password: hashedPassword })
    .single();
  if (error) throw error;
  return user;
};

export const getUsers = async () => {
  const { data: users, error } = await supabase.from("users").select("*");
  if (error) {
    throw error;
  }
  return users;
};

export const getUserbyId = async (id: string) => {
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return user;
};

export const updateUserbyId = async (id: string, data: Partial<User>) => {
  const { data: user, error } = await supabase
    .from("users")
    .update(data)
    .eq("id", id)
    .single();

  if (error) throw error;
  return user;
};

export const deleteUserbyId = async (id: string) => {
  const { data: user, error } = await supabase
    .from("users")
    .delete()
    .eq("id", id)
    .single();
  if (error) throw error;
  return user;
};

export const loginUser = async (credentials: Pick<User, 'email' | 'password'>) => {
  if (!credentials.email || !credentials.password) {
    throw new Error("Email and password are required");
  }
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", credentials.email)
    .single();

  if (error || !user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // In a real application, use an environment variable for the JWT secret
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || "your-secret-key", {
    expiresIn: "1h", // Token expires in 1 hour
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token };
};
