import { Explore } from "@/features/explore";
import { ExploreHeader, Header } from "@/features/header";

const ExplorePage = () => {
  return (
    <>
      <Header>
        <ExploreHeader />
      </Header>
      <Explore />
    </>
  );
};

export default ExplorePage;

export const metadata = {
  title: "Explore",
  description: "The latest stories on Chirp - as told by Tweets.",
};
