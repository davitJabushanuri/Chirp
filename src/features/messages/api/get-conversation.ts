import supabase from "@/utils/supabaseClient";

export const getConversation = async (id: string | undefined) => {
  const { data, error } = await supabase
    .from("Conversation")
    .select("*")
    .eq("id", id)
    .order("created_at", { ascending: true });

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return data;
};
