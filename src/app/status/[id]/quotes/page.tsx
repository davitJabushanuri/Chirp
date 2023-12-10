import { TweetHeader } from "@/features/header";
import { TweetQuotes } from "@/features/tweets";

const Quotes = () => {
  return (
    <>
      <TweetHeader heading="Quotes" />
      <TweetQuotes />
    </>
  );
};

export default Quotes;

export const metadata = {
  title: "Quotes",
};
