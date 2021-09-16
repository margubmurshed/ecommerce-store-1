import {useState} from "react";
import SearchResult from "./SearchResult";

const SearchBar = props => {
    const [searchValue, setSearchValue] = useState('');

  return (
    <div className="w-11/12 md:w-8/12 m-auto mb-10">
      <input
        type="text"
        className="w-full outline-none py-3 px-5 rounded-md m-auto mb-2"
        placeholder="Enter Product Name Or Catagory ( Ex. Shirt, Hijab )"
        onChange={e => setSearchValue(e.target.value)}
        value={searchValue}
      />
      {searchValue ? <SearchResult searchValue={searchValue} /> : ""}
    </div>
  );
};

export default SearchBar;