import { Fragment, useState } from "react";
import { useAddToCart } from "../../Components/Hooks/useAddToCart";
import useInnerWidth from "../../Components/Hooks/useInnerWidth";

const CartProducts = ({ cart }) => {
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const AddToCart = useAddToCart();
  const width = useInnerWidth();

  // const OnClickAddToCart = (product, type) => {
  //   const { loading } = AddToCart(cart, product, type);
  //   console.log('clicked! loading', loading)
  //   setAddToCartLoading(loading);
  // };

  return (
    <>
      <div className="bg-white flex flex-col gap-2 rounded-md shadow-md p-4">
        {cart.map(cartItem => {
          const { product, count } = cartItem;
          return (
            <Fragment key={Math.random()}>
              <div className="flex gap-5 overflow-x-auto">
                <img
                  src={product.productImage}
                  alt={product.name}
                  className="w-12 h-12 md:h-auto"
                  style={{ flexBasis: '10%' }}
                />
                <p
                  className="text-xs md:text-base"
                  style={{ flexBasis: '60%' }}
                >
                  {width <= 640 ? product.name.slice(0, 60).concat('...') : product.name}
                </p>
                <div className="flex amount-changer gap-3 justify-between items-center" style={{ flexBasis: '10%' }}>
                  <button onClick={() => AddToCart(cart, product, 'increase')}>+</button>
                  <input
                    type="tel"
                    value={count}
                    readOnly
                  />
                  <button onClick={() => AddToCart(cart, product, 'decrease')}>-</button>
                </div>
                <p className="cart-product-price flex items-center justify-center text-sm md:text-base" style={{ flexBasis: '20%' }}>
                  Tk. {product.price}
                </p>
              </div>
              <hr />
            </Fragment>
          );
        })}
      </div>
    </>
  );
};

export default CartProducts;
