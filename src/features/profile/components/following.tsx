"use client";
import { usePathname } from "next/navigation";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { PersonDetails } from "@/features/connect";

import { useGetFollows } from "../hooks/use-get-follows";
import { useUser } from "../hooks/use-user";

import { FollowersHeader } from "./followers-header";
import { NoFollowers } from "./no-followers";

export const Following = () => {
  const pathname = usePathname();
  const id = pathname?.split("/")[1];

  const {
    data: following,
    isLoading,
    isError,
  } = useGetFollows({
    id,
    type: "following",
  });
  const { data: user } = useUser(id);

  if (isLoading) {
    return (
      <>
        <FollowersHeader />
        <LoadingSpinner />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <FollowersHeader />
        <TryAgain />
      </>
    );
  }

  return (
    <div>
      <FollowersHeader />

      {following?.length === 0 ? (
        <NoFollowers
          title={`@${user?.email?.split("@")[0]} isn’t following anyone`}
          subtitle="Once they follow accounts, they’ll show up here."
        />
      ) : (
        <div>
          {following?.map((follow) => {
            return (
              <PersonDetails
                key={follow?.following?.id}
                author={follow?.following}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
