import cuid from "cuid";

import supabase from "@/utils/supabaseClient";

export const postImage = async (file: File) => {
  try {
    const imagePath = cuid();

    const { error } = await supabase.storage
      .from("banners")
      .upload(`banner-${imagePath}`, file, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error) {
      console.log("error", error);
    } else {
      const { data: mediaUrl } = supabase.storage
        .from("banners")
        .getPublicUrl(`banner-${imagePath}`);

      return mediaUrl?.publicUrl;
    }
  } catch (error) {
    console.log("error", error);
  }
};
