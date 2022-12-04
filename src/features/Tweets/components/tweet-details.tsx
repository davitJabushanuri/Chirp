import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

import getTweet from "../api/getTweet";

import styles from "./styles/tweet-details.module.scss";

export const TweetDetails = () => {
  const pathname = usePathname();
  const id = pathname?.split(`/`)[2] || ``;

  const {
    data: tweet,
    isLoading,
    isError,
  } = useQuery(["tweet", id], () => getTweet({ id }));

  console.log(tweet);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return <div className={styles.container}>tweet details</div>;
};
