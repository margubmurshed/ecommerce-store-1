import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FetchSearchResults } from "../../Redux/ActionCreator";

const SearchResult = ({ searchValue }) => {
  const dispatch = useDispatch();
  const [relatedSearchResults, setRelatedSearchResults] = useState([]);
  const searchResults = useSelector(({ searchResults }) => searchResults);

  useEffect(() => {
    dispatch(FetchSearchResults());
  }, [])

  useEffect(() => {
    const results = searchResults.filter(({ searchString }) => {
      return searchString.includes(searchValue.toLowerCase())
    })
    setRelatedSearchResults(results)
  }, [searchValue])

  if (!relatedSearchResults.length) return <div></div>;
  return (
    <div
      className={`w-full z-10 bg-white py-3 px-5 rounded-md shadow-md m-auto flex flex-col gap-y-5 overflow-y-auto`}
      style={{ maxHeight: '200px' }}
    >
      {relatedSearchResults.map(({ searchString }) => (
        <Link to={`/search/${searchString.split(" ").join("+")}`}>
          <p className="font-semibold">{searchString}</p>
        </Link>
      ))}
    </div>
  );
};

export default SearchResult;
