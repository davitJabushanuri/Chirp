import { WithRepliesClientPage } from "./client";

const WithRepliesPage = () => {
  return <WithRepliesClientPage />;
};

export default WithRepliesPage;

// TODO: get user's name and username from the database and use it to set the title of the page
export const metadata = {
  title: "Tweets with replies",
};
