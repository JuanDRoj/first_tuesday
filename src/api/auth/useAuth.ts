import { supabase } from "@/lib/supabaseClient";
export type User = {
  email: string;
  password: string;
};

// logIn User
export const logInUser = async (user: User) => {
  const { data: authData, error } = await supabase.auth.signInWithPassword(
    user
  );
  if (error) throw new Error("Error: " + error.message);
  return authData;
};

// LogOut User
export const logOutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error("Error: " + error.message);
};

// Get user
export const getLogedUserData = async () => {
  const { data } = await supabase.auth.getUser();
  return data;
};

// Verify if user exist and its role
export const verifyUser = async (user_id: string, role?: string) => {
  let query = supabase.from("user_roles").select("*").eq("id", user_id);

  if (role) {
    query = query.eq("role", role);
  }

  const { data: userRole, error } = await query.single();

  if (error)
    throw new Error(
      "Error: " + (userRole ? error.message : ": User is not admin")
    );

  return userRole;
};
