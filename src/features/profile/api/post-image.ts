import cuid from "cuid";

import supabase from "@/utils/supabaseClient";

export const postImage = async (file: File, bucket: string) => {
  try {
    const imagePath = cuid();

    const { error } = await supabase.storage
      .from(bucket)
      .upload(`${bucket}-${imagePath}`, file, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error) {
      console.log("error", error);
    } else {
      const { data: mediaUrl } = supabase.storage
        .from(bucket)
        .getPublicUrl(`${bucket}-${imagePath}`);

      return mediaUrl?.publicUrl;
    }
  } catch (error) {
    console.log("error", error);
  }
};
