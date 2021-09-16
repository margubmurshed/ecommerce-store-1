import { connect } from "react-redux";
import { Link } from "react-router-dom";

const MapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

const SearchResult = ({searchValue, products}) => {

  function MatchedProductsSupplier(searchValue, allProducts) {
    const preparedSearchValueForMatch = searchValue
      .toLowerCase()
      .split(" ")
      .join("");
    return (
      searchValue &&
      allProducts.filter((product) =>
        product.name
          .toLowerCase()
          .split(" ")
          .join("")
          .includes(preparedSearchValueForMatch)
      )
    );
  };

  const MatchedProducts = MatchedProductsSupplier(searchValue, products);
  
  return (
    <div
      className={`w-full ${
        MatchedProducts.length ? "h-64" : "h-20"
      } z-10 bg-white py-3 px-5 rounded-md shadow-md m-auto flex flex-col gap-y-5 overflow-auto`}
    >
      {MatchedProducts.length ? (
        MatchedProducts.map((product) => {
          return (
            <Link
              to={`/products/${product.name.split(" ").join("-")}/${
                product.id
              }`}
            >
              <div className="flex shadow">
                {/* Image */}
                <div className="w-full" style={{ flex: "0.3" }}>
                  <div
                    className="w-full h-full bg-center bg-cover bg-no-repeat"
                    style={{ backgroundImage: `url(${product.productImage})` }}
                  />
                </div>
                {/* Content */}
                <div
                  className="flex flex-col justify-center px-3 py-2 gap-2"
                  style={{ flex: "0.7" }}
                >
                  <p className="text-xs md:text-base">{product.name}</p>
                  <p>{product.price} Taka</p>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <p>No Product Found</p>
        </div>
      )}
    </div>
  );
};

export default connect(MapStateToProps)(SearchResult);
