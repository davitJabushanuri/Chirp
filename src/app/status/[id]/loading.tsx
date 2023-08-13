import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TweetHeader } from "@/features/header";

export default function Loading() {
  return (
    <>
      <TweetHeader />
      <LoadingSpinner />
    </>
  );
}
