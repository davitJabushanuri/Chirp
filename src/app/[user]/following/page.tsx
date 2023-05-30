import { FollowingClientPage } from "./client";

const FollowingPage = () => {
  return <FollowingClientPage />;
};

export default FollowingPage;

// TODO: get user's name and username from the database and use it to set the title of the page
export const metadata = {
  title: "People followed by User",
};
