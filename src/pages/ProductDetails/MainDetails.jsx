import { useState } from "react";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Chip } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import useAddToCart from "../../Hooks/useAddToCart";
import useFavorites from "../../Hooks/useFavorites";
import useInnerWidth from '../../Hooks/useInnerWidth';
import Alert from '../../Components/Alert';

const MainDetails = ({ Product, cart }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [toggleFavoritesLoading, setToggleFavoritesLoading] = useState(false);

  const history = useHistory();
  const width = useInnerWidth();
  const AddToCartFunc = useAddToCart();
  const ToggleFavoritesFunc = useFavorites();

  const { favorites, user } = useSelector(({ favorites, user }) => ({ favorites, user }));
  const { name, catagory, price, productImage } = Product;

  const OnClickAddToCart = () => {
    const { error: addToCartError, loading: addToCartLoading } = AddToCartFunc(cart, Product, 'increase');
    setLoading(addToCartLoading);
    addToCartError && setError([...error, 'Add To Cart Failed']);
  }

  const OnClickToggleFavorites = () => {
    if (user) {
      const favorite = FindWhetherFavorite();
      if (!favorite) {
        const { loading } = ToggleFavoritesFunc(Product, true);
        setToggleFavoritesLoading(loading);
      } else {
        const { loading } = ToggleFavoritesFunc(Product, false);
        setToggleFavoritesLoading(loading);
      }
    } else {
      history.push("/login");
    }
  };

  const FindWhetherFavorite = () => {
    const IsFavorite = user ? !!favorites.filter(
      (favoriteProduct) => favoriteProduct.id === Product.id
    ).length : false;
    return IsFavorite;
  };

  const buyNow = () => {
    const SHIPPING_COST = 50;
    if (Product) {
      history.push({
        pathname: '/checkout',
        state: {
          cart: [{ product: Product, count: 1 }],
          total: parseInt(price) + SHIPPING_COST
        }
      })
    }
  }

  return (
    <>
      <div className="flex flex-col md:flex-row shadow m-auto">
        <div className="flex flex-col md:flex-row bg-white p-3">
          {error.length ? error.map(message => <Alert color='red' message={message} />) : ''}
          <div style={{ flexBasis: width >= 768 ? '30%' : '100%', height: '100%' }} className="flex items-center">
            <img src={productImage} alt={name} width="100%" height="auto" />
          </div>
          <div className="p-4 md:p-10 flex-1 flex flex-col gap-6">
            <p className="text-base md:text-2xl font-semibold">{name}</p>
            <p>
              Catagory: <Chip
                label={catagory}
                color="primary"
                variant="outlined"
                clickable
              />
            </p>
            <p className="text-xl font-semibold">{price} Taka</p>
            <div className="flex gap-2">
              <Button
                variant="outlined"
                color="primary"
                onClick={OnClickAddToCart}
                disabled={loading}
              >
                Add To Cart
              </Button>
              <Button variant="contained" color="primary" onClick={buyNow}>
                Buy Now
              </Button>
            </div>
            <div className="flex">
              <Button startIcon={<Favorite />} onClick={OnClickToggleFavorites} disabled={toggleFavoritesLoading}>{FindWhetherFavorite() ? 'Remove From Favorites' : 'Add To Favorites'}</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainDetails;
