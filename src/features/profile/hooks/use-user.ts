import { useQuery } from "@tanstack/react-query";

import { getUser } from "../api/get-user";
import { IUser } from "../types";

export const useUser = ({
  id,
  initialData,
}: {
  id: string | undefined;
  initialData?: IUser;
}) => {
  return useQuery<IUser>({
    queryKey: ["users", id],
    queryFn: async () => {
      return getUser(id);
    },
    refetchOnWindowFocus: false,
    initialData: initialData ?? undefined,
  });
};
