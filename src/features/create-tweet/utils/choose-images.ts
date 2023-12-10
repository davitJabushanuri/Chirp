import { toast } from "react-toastify";

import { IChosenImages } from "../types";

export const chooseImages = async ({
  event,
  chosenImagesLength,
  setChosenImages,
}: {
  event: React.ChangeEvent<HTMLInputElement>;
  chosenImagesLength: number;
  setChosenImages: React.Dispatch<React.SetStateAction<IChosenImages[]>>;
}) => {
  const files = event?.target?.files;

  if (files) {
    if (files?.length + chosenImagesLength > 4) {
      event.target.value = "";
      return toast("Please choose either 1 GIF or upto 4 photos.");
    }

    for (const file of files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const image = new Image();
        image.src = reader.result as string;
        setChosenImages((prev) => {
          return [
            ...prev,
            {
              url: reader.result,
              id: Math.random(),
              file: file,
              width: image.width,
              height: image.height,
            },
          ];
        });
      };
    }
  }

  event.target.value = "";
};
