import { createId } from "@paralleldrive/cuid2";

import { supabase } from "@/utils/supabase-client";

export const postImage = async (file: File, bucket: string) => {
  try {
    const imagePath = createId();

    const { error } = await supabase.storage
      .from(bucket)
      .upload(`${bucket}-${imagePath}`, file, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error) {
      throw new Error(error.message);
    } else {
      const { data: mediaUrl } = supabase.storage
        .from(bucket)
        .getPublicUrl(`${bucket}-${imagePath}`);

      return { url: mediaUrl?.publicUrl };
    }
  } catch (error: unknown) {
    throw new Error("Error uploading image");
  }
};
