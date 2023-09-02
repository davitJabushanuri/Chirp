import { ExploreHeader, Header } from "@/features/header";
import { SearchResults } from "@/features/search";

const SearchPage = () => {
  return (
    <>
      <Header>
        <ExploreHeader />
      </Header>
      <SearchResults />
    </>
  );
};

export default SearchPage;

export const metadata = {
  title: "Search",
};
