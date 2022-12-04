import supabase from "@/utils/supabaseClient";

export default async function getTweet() {
  const { data, error } = await supabase.from("Tweet").select("*");
  if (error) {
    console.log("error", error);
  }
  return data;
}
