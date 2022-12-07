import supabase from "@/utils/supabaseClient";

export const logout = () => async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
    return { error };
  }
};
