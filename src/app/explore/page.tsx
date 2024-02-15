import { Explore } from "@/features/explore";
import { ExploreHeader } from "@/features/header";

const ExplorePage = () => {
  return (
    <div>
      <ExploreHeader />
      <Explore />
    </div>
  );
};

export default ExplorePage;

export const metadata = {
  title: "Explore",
  description: "The latest stories on Chirp - as told by Tweets.",
};
