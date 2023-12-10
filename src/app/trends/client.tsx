"use client";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { useHashtags } from "@/features/explore";
import { TrendsHeader } from "@/features/trends";
import { Trend } from "@/features/trends";

export const TrendsClientPage = () => {
  const { data: hashtags, isLoading, isError } = useHashtags();

  if (isLoading) {
    return (
      <>
        <TrendsHeader />
        <LoadingSpinner />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <TrendsHeader />
        <TryAgain />
      </>
    );
  }

  return (
    <div
      style={{
        paddingBottom: "100vh - 8rem",
      }}
    >
      <TrendsHeader />

      <div>
        {hashtags?.map((hashtag, index) => {
          return (
            <div key={hashtag.id}>
              <Trend
                title={hashtag?.text}
                ranking={index + 1}
                tweets={hashtag?.score}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
