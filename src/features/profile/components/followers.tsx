"use client";
import { usePathname } from "next/navigation";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { PersonDetails } from "@/features/connect";

import { useGetFollows } from "../hooks/use-get-follows";

import { FollowersHeader } from "./followers-header";
import { NoFollowers } from "./no-followers";

export const Followers = () => {
  const pathname = usePathname();
  const id = pathname?.split("/")[1];

  const {
    data: followers,
    isLoading,
    isError,
  } = useGetFollows({
    id,
    type: "followers",
  });

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
          {followers?.map((follower) => {
            return <PersonDetails key={follower?.id} author={follower} />;
          })}
        </div>
      )}
    </div>
  );
};
