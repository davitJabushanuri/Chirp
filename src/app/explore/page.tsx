import { Explore } from "@/features/explore";
import { ExploreHeader, Header } from "@/features/header";

const ExplorePage = () => {
  return (
    <div>
      <Header>
        <ExploreHeader />
      </Header>
      <Explore />
    </div>
  );
};

export default ExplorePage;

export const metadata = {
  title: "Explore",
  description: "The latest stories on Chirp - as told by Tweets.",
};
