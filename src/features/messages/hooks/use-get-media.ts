import { useQuery } from "@tanstack/react-query";

import { IMedia } from "@/features/tweets";

import { getMedia } from "../api/get-media";

export const useGetMedia = (messageId: string | undefined) => {
  return useQuery<IMedia[]>(
    ["media", messageId],
    async () => {
      return getMedia(messageId);
    },
    {
      refetchOnWindowFocus: false,
    },
  );
};
