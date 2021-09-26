import { Fragment, useState } from "react";
import { useAddToCart } from "../../Components/Hooks/useAddToCart";

const CartProducts = ({ cart, user }) => {
  const [productCount, setProductCount] = useState("");
  const AddToCartFunc = useAddToCart();

  const handleSubmit = (e, product) => {
    e.preventDefault();
    // AddToCartFunc(product, user, cart)
    console.log(e.target.children[0].value);
  }

  return (
    <>
      <div className="bg-white flex flex-col gap-2 rounded-md shadow-md p-4">
        {cart.map(({ product, count }) => {
          return (
            <Fragment key={Math.random()}>
              <div className="flex gap-10 overflow-x-auto">
                <img
                  src={product.productImage}
                  alt={product.name}
                  className="w-12 md:w-20 h-auto"
                />
                <p className="text-xs md:text-base">{product.name}</p>
                <div className="flex amount-changer justify-between items-center">
                  <button>+</button>
                  <form onSubmit={(e) => handleSubmit(e, product)}>
                    <input
                      type="tel"
                      value={productCount ? productCount : count}
                      onChange={(e) => setProductCount(e.target.value)}
                      required
                    />
                    <input type="submit" className="hidden" />
                  </form>
                  <button>-</button>
                </div>
                <p className="cart-product-price flex items-center justify-center">
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
