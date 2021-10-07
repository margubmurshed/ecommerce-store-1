import { useHistory } from "react-router-dom";

const CartSummary = ({ subTotal, total, cart }) => {

  const history = useHistory();
  const proceedToCheckout = () => {
    history.push({
      pathname: '/checkout',
      state: {
        cart,
        total: total()
      }
    })
  }

  return (
    <>
      <div className="checkout-summary flex flex-col bg-white rounded-md shadow-md sticky top-5 p-4">
        <p className="mb-4 text-xl font-semibold">Cart Summary</p>
        <hr />
        <div className="mt-4 flex flex-col gap-3">
          <div className="flex justify-between w-full">
            <p className="flex-1">Subtotal</p>
            <p>Tk. {subTotal()}</p>
            <hr />
          </div>
          <div className="flex justify-between w-full">
            <p className="font-semibold flex-1">Total</p>
            <p className="font-semibold">Tk. {total()}</p>
            <hr />
          </div>
          <button className="w-full bg-green-400 text-white p-3 rounded-md" onClick={proceedToCheckout}>Proceed To Checkout</button>
        </div>
      </div>
    </>
  );
};

export default CartSummary;
