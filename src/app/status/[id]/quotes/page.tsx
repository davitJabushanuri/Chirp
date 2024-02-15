import { TweetHeader } from "@/features/header";
import { TweetQuotes } from "@/features/tweets";

const Quotes = () => {
  return (
    <>
      <TweetHeader />
      <TweetQuotes />
    </>
  );
};

export default Quotes;

export const metadata = {
  title: "Quotes",
};
