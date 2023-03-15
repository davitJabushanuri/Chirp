"use client";
import { usePathname } from "next/navigation";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { PersonDetails } from "@/features/connect";

import { useGetFollowers } from "../hooks/use-get-followers";

import { FollowersHeader } from "./followers-header";
import { NoFollowers } from "./no-followers";

export const Followers = () => {
  const pathname = usePathname();
  const id = pathname?.split("/")[1];

  const { data: followers, isLoading, isError } = useGetFollowers(id);

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

      {followers?.length === 0 ? (
        <NoFollowers
          title="Looking for followers?"
          subtitle="When someone follows this account, they'll show up here. Tweeting
            and interacting with others helps boost followers."
        />
      ) : (
        <div>
          {followers?.map((follow) => {
            return (
              <PersonDetails
                key={follow?.follower?.id}
                author={follow?.follower}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
