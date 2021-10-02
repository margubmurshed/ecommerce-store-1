import { useState } from "react";
import { useHistory } from "react-router";
import { FireStore } from "../../firebase";
import SearchResult from "./SearchResult";

const SearchBar = () => {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');
  const handleSubmit = async e => {
    e.preventDefault();
    await FireStore.collection("searchResults").add({ searchString: searchValue });
    history.push(`/search/${searchValue.toLowerCase().split(" ").join("+")}`);
  }

  return (
    <div className="w-11/12 md:w-8/12 m-auto mb-10">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full outline-none text-sm md:text-base py-3 px-5 rounded-md m-auto mb-2"
          placeholder="Enter Product Keyword Or Catagory ( Ex. Shirt, Hijab )"
          onChange={e => setSearchValue(e.target.value)}
          value={searchValue}
        />
        <input type="submit" value="submit" className="hidden" />
      </form>
      {searchValue ? <SearchResult searchValue={searchValue} /> : ""}
    </div>
  );
};

export default SearchBar;