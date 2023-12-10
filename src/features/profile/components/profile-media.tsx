"use client";
import { usePathname } from "next/navigation";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { InfiniteTweets, useTweets } from "@/features/tweets";

import styles from "./styles/profile-media.module.scss";

export const ProfileMedia = () => {
  const pathname = usePathname();
  const id = pathname?.split("/")[1] as string;

  const {
    data: tweets,
    isLoading,
    isError,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useTweets({
    queryKey: ["tweets", id, "media"],
    type: "user_media",
    id,
  });

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.error}>
        <TryAgain />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* {isSuccess && tweets?.length === 0 && (
        <div className={styles.noMedia}>
          {session?.user?.id === id ? (
            <div>
              <Image
                src="/media-placeholder.png"
                alt=""
                height={500}
                width={500}
              />
              <h1>Lights, camera ... attachments!</h1>
              <p>
                When you send tweets with photos or videos in them, they will
                show up here.
              </p>
            </div>
          ) : (
            <div>
              <Image
                src="/media-placeholder.png"
                alt=""
                width={500}
                height={500}
              />
              <h1>@{user?.email?.split("@")[0]} hasn&apos;t tweeted media</h1>
              <p>Once they do, those Tweets will show up here.</p>
            </div>
          )}
        </div>
      )} */}

      <InfiniteTweets
        tweets={tweets}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isSuccess={isSuccess}
      />
    </div>
  );
};
