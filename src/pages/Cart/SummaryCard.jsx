import React from "react";
import { useHistory } from "react-router-dom";

const SummaryCard = ({SubTotal, Total, cart}) => {
  const history = useHistory();

  const OnClickProceedToCheckout = () => {
    history.push({
      pathname: '/checkout',
      state:{
        cart,
        total: Total()
      }
    })
  }

  return (
    <>
      <div className="checkout-summary flex flex-col bg-white rounded-md shadow-md sticky top-0 p-4">
        <p className="mb-4 text-xl">Checkout Summary</p>
        <hr />
        <div className="mt-4 flex flex-col gap-3">
          <div className="flex justify-between w-full">
            <p className="flex-1">Subtotal</p>
            <p>Tk. {SubTotal()}</p>
            <hr />
          </div>
          <div className="flex justify-between w-full">
            <p className="flex-1">Shipping</p>
            <p>Tk. 50</p>
            <hr />
          </div>
          <div className="flex justify-between w-full">
            <p className="flex-1">Total</p>
            <p>Tk. {Total()}</p>
            <hr />
          </div>
          <div className="flex justify-between w-full">
            <p className="font-semibold flex-1">Payable Total</p>
            <p>Tk. {Total()}</p>
            <hr />
          </div>
          <button className="w-full bg-green-400 text-white p-3 rounded-md" onClick={OnClickProceedToCheckout}>Proceed To Checkout</button>
        </div>
      </div>
    </>
  );
};

export default SummaryCard;
