// import supabase from "@/utils/supabaseClient";
import supabase from "@/utils/supabase-browser";

export const loginWithPassword = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.log(error);
    return { error };
  }

  return { data };
};
