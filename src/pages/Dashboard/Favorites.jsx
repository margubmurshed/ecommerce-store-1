import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../Components/ProductCard/ProductCard";

const Favorites = () => {
  const favorites = useSelector(({ favorites }) => favorites)
  return (
    <div className="p-5">
      <div className="bg-blue-500 text-white p-3 mb-5 text-center rounded-md">My Favorites</div>
      {favorites.length ? (
        <div className="flex justify-around flex-wrap">
          {favorites.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center p-5">
          <span className="font-semibold text-gray-500">
            No Favorite Product Found
          </span>
        </div>
      )}
    </div>
  );
};

export default Favorites;
