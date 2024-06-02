import { ChangeEvent } from "react";
import { UseFormSetValue } from "react-hook-form";
import { toast } from "react-toastify";

import { IMessageInput } from "../types";

export const chooseImage = (
  e: ChangeEvent<HTMLInputElement>,
  imageUploadRef: React.RefObject<HTMLInputElement>,
  setValue: UseFormSetValue<IMessageInput>,
) => {
  const file = e.target.files?.[0];

  if (imageUploadRef.current) imageUploadRef.current.value = "";

  if (file) {
    if (file.size > 5000000) {
      toast.error("The image you've selected is too large.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img = document.createElement("img");
      img.src = reader.result as string;

      img.onload = () => {
        setValue("image", {
          file: file,
          width: img.width,
          height: img.height,
          preview: reader.result,
        });
      };
    };
  }
};
