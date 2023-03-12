import { LikesCLientPage } from "./client";

const page = () => {
  return <LikesCLientPage />;
};

export default page;

// TODO: get user's name and username from the database and use it to set the title of the page
export const metadata = {
  title: "Tweets liked by User",
};
