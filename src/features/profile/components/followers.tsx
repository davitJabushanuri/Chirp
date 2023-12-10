"use client";
import { usePathname } from "next/navigation";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { PersonDetails } from "@/features/connect";

import { useGetFollows } from "../hooks/use-get-follows";

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
    return <LoadingSpinner />;
  }

  if (isError) {
    return <TryAgain />;
  }

  return (
    <div>
      {followers?.length === 0 ? (
        <NoFollowers
          title="Looking for followers?"
          subtitle="When someone follows this account, they'll show up here. Tweeting
            and interacting with others helps boost followers."
        />
      ) : (
        <div>
          {followers?.map((user) => {
            return <PersonDetails key={user?.id} author={user} />;
          })}
        </div>
      )}
    </div>
  );
};
