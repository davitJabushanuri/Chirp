import { ChangeEvent } from "react";
import { toast } from "react-toastify";

import { IMessage } from "../components/message-input";

export const chooseImage = (
  e: ChangeEvent<HTMLInputElement>,
  imageUploadRef: React.RefObject<HTMLInputElement>,
  setMessage: React.Dispatch<React.SetStateAction<IMessage>>,
) => {
  const file = e.target.files?.[0];

  if (imageUploadRef.current) imageUploadRef.current.value = "";

  if (file) {
    if (file.size > 5000000) {
      toast.error("Image size should not exceed 5MB");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img = document.createElement("img");
      img.src = reader.result as string;

      img.onload = () => {
        setMessage((prev) => {
          return {
            ...prev,
            image_preview: reader.result,
            image_file: file,
            image_width: img.width,
            image_height: img.height,
          };
        });
      };
    };
  }
};
