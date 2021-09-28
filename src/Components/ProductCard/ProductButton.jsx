import { Button, IconButton } from "@material-ui/core";
import {
  Favorite,
  FavoriteBorderOutlined,
  ShoppingBasket,
} from "@material-ui/icons";
import { useState } from "react";
import { useAddToCart } from "../Hooks/useAddToCart";
import { useFavorites } from "../Hooks/useFavorites";
import { useHistory } from "react-router-dom";

const ProductButton = ({ favorites, user, product, cart }) => {
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const [toggleFavoritesLoading, setToggleFavoritesLoading] = useState(false);
  const AddToCartFunc = useAddToCart();
  const ToggleFavoritesFunc = useFavorites();
  const history = useHistory();

  const OnClickAddToCart = () => {
    const { loading } = AddToCartFunc(product, user, cart);
    setAddToCartLoading(loading);
  };

  const OnClickToggleFavorites = () => {
    if (user) {
      const favorite = FindWhetherFavorite();
      if (!favorite) {
        const { loading } = ToggleFavoritesFunc(
          favorites,
          product,
          user.uid,
          true
        );
        setToggleFavoritesLoading(loading);
      } else {
        const { loading } = ToggleFavoritesFunc(
          favorites,
          product,
          user.uid,
          false
        );
        setToggleFavoritesLoading(loading);
      }
    } else {
      history.push("/login");
    }
  };

  const FindWhetherFavorite = () => {
    const IsFavorite = !!favorites.filter(
      (favoriteProduct) => favoriteProduct.id === product.id
    ).length;
    return IsFavorite;
  };

  return (
    <div className="product-buttons flex items-center justify-between p-3">
      <IconButton
        color="primary"
        onClick={OnClickToggleFavorites}
        disabled={toggleFavoritesLoading}
      >
        {FindWhetherFavorite() ? <Favorite /> : <FavoriteBorderOutlined />}
      </IconButton>
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
