import supabase from "@/utils/supabaseClient";

export const postMedia = async ({
  files,
  tweetId,
}: {
  files: File[];
  tweetId: string;
}) => {
  try {
    files.forEach(async (file) => {
      const { data: media, error } = await supabase.storage
        .from("images")
        .upload(`image-${file.name}`, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.log("error", error);
      } else
        await fetch("/api/tweets/media", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tweet_id: tweetId,
            media_url: media?.path,
            media_type: "image",
          }),
        });
    });
  } catch (error) {
    console.log("error", error);
  }
};
