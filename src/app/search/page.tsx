import { ExploreHeader, Header } from "@/features/header";
import { SearchResults } from "@/features/search";

const SearchPage = () => {
  return (
    <div>
      <Header>
        <ExploreHeader />
      </Header>
      <SearchResults />
    </div>
  );
};

export default SearchPage;

export const metadata = {
  title: "Search",
};
