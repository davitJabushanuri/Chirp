import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export const useCreateConversation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      senderId,
      receiverId,
    }: {
      senderId: string | undefined;
      receiverId: string | null | undefined;
    }) => {
      const { data } = await axios.post(`/api/messages/conversations`, {
        sender_id: senderId,
        receiver_id: receiverId,
      });
      return data;
    },

    onSuccess: (data) => {
      router.push(`/messages/${data?.id}`);
    },

    onError: (error) => {
      console.log("error", error);
    },
  });
};
