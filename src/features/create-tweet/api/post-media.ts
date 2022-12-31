import cuid from "cuid";

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
      const imagePath = cuid();

      const { error } = await supabase.storage
        .from("images")
        .upload(`image-${imagePath}`, file, {
          cacheControl: "3600",
          upsert: false,
        });
      if (error) {
        console.log("error", error);
        throw new Error("Failed to upload image");
      } else {
        const { data: mediaUrl } = supabase.storage
          .from("images")
          .getPublicUrl(`image-${imagePath}`);

        await fetch("/api/tweets/media", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tweet_id: tweetId,
            media_url: mediaUrl?.publicUrl,
            media_type: "image",
          }),
        });
      }
    });
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to upload image");
  }
};
