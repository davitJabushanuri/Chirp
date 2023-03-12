import { TweetClientPage } from "./client";

const TweetPage = () => {
  return <TweetClientPage />;
};

export default TweetPage;

// * can't access the pathname from server components to get the id of the tweet and fetch tweet metadata from the database
// TODO: find a way to get the pathname from server components
export const metadata = {
  title: "Tweet",
};
