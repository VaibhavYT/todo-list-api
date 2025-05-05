import { supabase } from "../config/db.config";

interface User {
  name: string;
  email: string;
  password: string;
}

export const createUser = async (data: User) => {
  if (!data || data.email || data.password || data.name) {
    throw new Error();
  }
  const { data: user, error } = await supabase
    .from("users")
    .insert(data)
    .single();
  if (error) throw error;
  return user;
};

export const getUser = async () => {
  const { data: users, error } = await supabase.from("users").select("*");
  if (error) {
    throw error;
  }
  return users;
};

export const getUserbyId = async (id: number) => {
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return user;
};

export const updateUserbyId = async (id: number, data: Partial<User>) => {
  const { data: user, error } = await supabase
    .from("users")
    .update(data)
    .eq("id", id)
    .single();

  if (error) throw error;
  return user;
};

export const deleteUserbyId = async (id: number) => {
  const { data: user, error } = await supabase
    .from("users")
    .delete()
    .eq("id", id)
    .single();
  if (error) throw error;
  return user;
};
