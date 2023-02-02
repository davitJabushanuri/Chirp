import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useCreateTweetModal } from "@/stores/use-create-tweet-modal";

import { postTweet } from "../api/post-tweet";
import { IChosenImages } from "../types";

export const useCreateTweet = ({
  setText,
  setChosenImages,
}: {
  setText: (text: string) => void;
  setChosenImages: (chosenImages: IChosenImages[]) => void;
}) => {
  const closeModal = useCreateTweetModal((state) => state.closeModal);

  const queryClient = useQueryClient();

  return useMutation(
    ({
      text,
      userId,
      files,
      in_reply_to_screen_name,
      in_reply_to_status_id,
      quoted_tweet_id,
    }: {
      text: string;
      userId: string;
      files: File[];
      in_reply_to_screen_name?: string | null;
      in_reply_to_status_id?: string | null;
      quoted_tweet_id?: string | null;
    }) => {
      return postTweet({
        text,
        userId,
        files,
        in_reply_to_screen_name,
        in_reply_to_status_id,
        quoted_tweet_id,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["tweets"]);
        queryClient.invalidateQueries(["hashtags"]);
      },
      onError: (error) => {
        console.log("error", error);
      },
      onSettled: () => {
        closeModal();
        setText("");
        setChosenImages([]);
      },
    },
  );
};
