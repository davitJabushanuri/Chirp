import axios from "axios";
import cuid from "cuid";

import { supabase } from "@/utils/supabase-client";

export const postMedia = async ({
  files,
  tweet_id,
  message_id,
}: {
  files: File[];
  tweet_id?: string;
  message_id?: string;
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

        const media = {
          ...(tweet_id && { tweet_id }),
          ...(message_id && { message_id }),
          media_url: mediaUrl?.publicUrl,
          media_type: "image",
          media_path: `image-${imagePath}`,
        };

        await axios.post("/api/media", {
          media,
        });
      }
    });

    return true;
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  }
};
