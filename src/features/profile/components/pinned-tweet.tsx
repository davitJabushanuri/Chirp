import { Tweet } from "@/features/tweets";

import { usePinnedTweet } from "../hooks/use-pinned-tweet";

export const PinnedTweet = ({ userId }: { userId: string | undefined }) => {
  const { data: pinnedTweet } = usePinnedTweet(userId);

  if (!pinnedTweet) return null;

  return (
    <div
      style={{
        borderBottom: "1px solid var(--clr-border)",
      }}
    >
      <Tweet tweet={pinnedTweet} pinned={true} />
    </div>
  );
};
