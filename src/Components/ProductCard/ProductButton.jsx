import { Button } from "@material-ui/core";
import { ShoppingBasket, } from "@material-ui/icons";
import { useState } from "react";
import { useAddToCart } from "../Hooks/useAddToCart";

const ProductButton = ({ product, cart }) => {
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const AddToCartFunc = useAddToCart();

  const OnClickAddToCart = () => {
    const { loading } = AddToCartFunc(cart, product, 'increase');
    setAddToCartLoading(loading);
  };

  return (
    <div className="p-3">
      <Button
        color="primary"
        variant="contained"
        startIcon={<ShoppingBasket />}
        onClick={OnClickAddToCart}
        disabled={addToCartLoading}
      >
        Add To Cart
      </Button>
    </div>
  );
};

export default ProductButton;
