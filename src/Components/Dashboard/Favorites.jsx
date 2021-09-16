import React from "react";
import { connect } from "react-redux";
import ProductCard from "../Product/ProductCard";

const MapStateToProps = (state) => {
  return {
    favorites: state.favorites,
  };
};

const Favorites = ({ favorites }) => {
  return (
    <div className="p-5">
      <div className="bg-white rounded-md shadow-md p-3">
        {favorites.length ? (
          <div className="flex justify-around flex-wrap">
            {favorites.map((product) => (
              <ProductCard product={product} />
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
    </div>
  );
};

export default connect(MapStateToProps)(Favorites);
