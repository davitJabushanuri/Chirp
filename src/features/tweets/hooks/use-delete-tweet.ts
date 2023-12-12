import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { deleteTweet } from "../api/delete-tweet";

export const useDeleteTweet = () => {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ tweetId }: { tweetId: string }) => {
      if (pathname === `/status/${tweetId}`) {
        router.back();
      }
      return deleteTweet(tweetId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tweets"] });
      toast("Your tweet was deleted");
    },
    onError: (error) => {
      console.log(error);
      toast("Something went wrong");
    },
  });
};
