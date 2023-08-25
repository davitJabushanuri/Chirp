import { Explore } from "@/features/explore";
import { ExploreHeader, Header } from "@/features/header";

const DefaultPage = () => {
  return (
    <div>
      <Header>
        <ExploreHeader />
      </Header>
      <Explore />
    </div>
  );
};

export default DefaultPage;

export const metadata = {
  title: "Chirp",
};
