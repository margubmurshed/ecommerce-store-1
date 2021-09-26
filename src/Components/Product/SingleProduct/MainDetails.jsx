import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import { useAddToCart } from "../../Hooks/useAddToCart";

const MainDetails = ({Product, user, cart}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const AddToCartFunc = useAddToCart();
  const {name, catagory, price, productImage} = Product;

  const OnClickAddToCart = () => {
    const {error:addToCartError, loading:addToCartLoading} = AddToCartFunc(Product, user, cart);
    setLoading(addToCartLoading);
    setError(addToCartError);
  }

  return (
    <>
      <div
        className="flex flex-col md:flex-row shadow m-auto"
        style={{ maxWidth: "80%" }}
      >
        <div className="flex flex-col md:flex-row bg-white p-3">
          {/* Product Image */}
          <div className="productImage">
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${productImage})` }}
            />
          </div>
          {/* Product Info */}
          <div className="p-4 md:p-10 flex flex-col gap-8">
            <p className="text-base md:text-2xl">{name}</p>
            <p>
              Catagory:{" "}
              <span className="px-5 py-2 bg-blue-100 rounded-md">
                {catagory}
              </span>
            </p>
            <p className="text-xl font-semibold">{price} Taka</p>
            <div className="flex gap-2">
              <Button
                variant="outlined"
                color="primary"
                onClick={OnClickAddToCart}
              >
                Add To Cart
              </Button>
              <Button variant="contained" color="primary">
                Buy Now
              </Button>
            </div>
            <div className="flex">
              <Button startIcon={<Favorite />}>Add To Favorites</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainDetails;
