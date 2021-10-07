import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./Cart.css";
import CartProducts from "./CartProducts";
import CartSummary from "./CartSummary";

const Cart = () => {
  const { user, cart } = useSelector(({ user, cart }) => ({ user, cart }));

  useEffect(() => {
    document.title = `Cart (${cart.length || ''}) | E-commerce`
  }, [cart]);

  const subTotal = () => {
    let subtotal = 0;
    cart.forEach(
      ({ product, count }) =>
        (subtotal += parseInt(product.price) * parseInt(count))
    );
    return subtotal;
  };

  const total = () => {
    const ShippingCost = 50;
    return subTotal() + ShippingCost;
  };

  if (cart.length) {
    return (
      <>
        <div className="w-full p-5 relative" style={{ minHeight: "90vh" }}>
          <div className="flex flex-col lg:flex-row items-start gap-5 w-full h-full">
            <div className="products flex flex-col gap-5">
              <div className="bg-white flex justify-between md:flex-row rounded-md shadow-md p-4">
                <p className="font-semibold text-sm md:text-base">My Cart ({cart.length} Items)</p>
                <p className="font-semibold text-sm md:text-base">Total: {total()} Tk.</p>
              </div>
              <CartProducts cart={cart} user={user} />
            </div>
            <CartSummary subTotal={subTotal} total={total} cart={cart} />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        className="w-full flex justify-center items-center"
        style={{ minHeight: "90vh" }}
      >
        <p>No product in the cart</p>
      </div>
    </>
  );
};

export default Cart;
