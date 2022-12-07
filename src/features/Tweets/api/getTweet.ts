import supabase from "@/utils/supabaseClient";

export default async function getTweet({ id }: { id: string }) {
  const { data, error } = await supabase.from("Tweet").select("*").eq("id", id);
  if (error) {
    console.log("error", error);
  }
  return data ? data[0] : null;
}
