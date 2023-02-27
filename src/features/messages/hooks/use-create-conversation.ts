import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export const useCreateConversation = () => {
  const router = useRouter();

  return useMutation(
    async ({
      senderId,
      receiverId,
    }: {
      senderId: string | undefined;
      receiverId: string | null | undefined;
    }) => {
      const { data } = await axios.post(`/api/messages/conversation/create`, {
        senderId,
        receiverId,
      });
      console.log("data", data);
      return data;
    },
    {
      onSuccess: (data) => {
        router.push(`/messages/${data?.id}`);
      },

      onError: (error) => {
        console.log("error", error);
      },

      onSettled: () => {},
    },
  );
};
