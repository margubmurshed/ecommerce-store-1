import {
  FormControlLabel, Radio, RadioGroup, TextField
} from "@material-ui/core";
import { useState } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { FireStore } from "../../firebase";
import BkashLogo from "../../img/bkashLogo.png";
import NagadLogo from "../../img/nagadLogo.svg";
import RocketLogo from "../../img/rocketLogo.png";
import UpayLogo from "../../img/upayLogo.jpg";
import "./Checkout.css";

const MapStateToProps = (state) => {
  return {
    uid: state.user.uid,
  };
};

const Checkout = ({ uid }) => {
  const location = useLocation();
  const history = useHistory();
  const { cart, total } = location.state;
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [alternativePhoneNumber, setAlternativePhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const GetPreviousOrders = () => {
    return new Promise((resolve) => {
      FireStore.collection("orders")
        .doc(uid)
        .get()
        .then((doc) => {
          const PreviousOrders = [];
          if (doc.exists) {
            PreviousOrders.push(...doc.data().orders);
          }
          resolve(PreviousOrders);
        });
    });
  };

  const ResetCart = () => {
    FireStore.collection("carts").doc(uid).set({ cart: [] });
  };

  const AllFieldsAreFilled = () => {
    if (
      name !== "" &&
      phoneNumber != "" &&
      address != "" &&
      paymentMethod != ""
    )
      return true;
    else {
      return false;
    }
  };

  const OnClickOrderNow = async () => {
    if (AllFieldsAreFilled()) {
      const PreviousOrders = await GetPreviousOrders();
      const Order = {
        userInfo: {
          name,
          phoneNumber,
          alternativePhoneNumber,
          address,
          paymentMethod,
        },
        orderInfo: {
          products: cart,
          total,
          time: new Date().getTime(),
          status: 'Pending'
        }
      };

      try {
        setError(false);
        setLoading(true);
        await FireStore.collection("orders")
          .doc(uid)
          .set({ orders: [...PreviousOrders, Order] });
        ResetCart();
        history.push({
          pathname: `/orderconfirmation/${uid}`,
          state: {
            uid,
          },
        });
        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-3 p-3 relative">
      <div className="flex flex-col bg-white rounded-md shadow-md p-5 gap-3 checkout-details">
        <span className="text-xl font-semibold px-5 py-3 bg-blue-100 text-blue-800 rounded-md">
          Shipping Info
        </span>
        <div className="flex flex-col gap-5">
          <TextField
            type="text"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Enter your name"
            autoComplete="off"
            required
          />
          <TextField
            type="tel"
            variant="outlined"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            label="Enter your phone number"
            autoComplete="off"
            required
          />
          <TextField
            type="tel"
            variant="outlined"
            value={alternativePhoneNumber}
            onChange={(e) => setAlternativePhoneNumber(e.target.value)}
            label="Enter your alternative phone number"
            autoComplete="off"
          />
          <TextField
            type="textarea"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            label="Enter your address"
            autoComplete="off"
            required
            minRows={50}
          />
          <div className="flex flex-col">
            <span className="text-xl font-semibold px-5 py-3 bg-blue-100 text-blue-800 rounded-md">
              Payment Method
            </span>
            <RadioGroup
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="px-2"
            >
              <div className="flex justify-between items-center py-5">
                <FormControlLabel
                  value="cod"
                  control={<Radio />}
                  label="Cash On Delivery"
                  color="primary"
                />
              </div>
              <div className="flex justify-between items-center py-5">
                <FormControlLabel
                  value="bkash"
                  control={<Radio />}
                  label="Bkash"
                  color="primary"
                />
                <img src={BkashLogo} alt="bkashLogo" width="80px" />
              </div>
              <div className="flex justify-between items-center py-5">
                <FormControlLabel
                  value="nagad"
                  control={<Radio />}
                  label="Nagad"
                  color="primary"
                />
                <img src={NagadLogo} alt="nagadLogo" width="80px" />
              </div>
              <div className="flex justify-between items-center py-5">
                <FormControlLabel
                  value="rocket"
                  control={<Radio />}
                  label="Rocket"
                  color="primary"
                />
                <img src={RocketLogo} alt="rocketLogo" width="80px" />
              </div>
              <div className="flex justify-between items-center py-5">
                <FormControlLabel
                  value="upay"
                  control={<Radio />}
                  label="Upay"
                  color="primary"
                />
                <img src={UpayLogo} alt="bkashLogo" width="80px" />
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
      <div className="checkout-summary flex flex-col bg-white rounded-md shadow-md sticky top-0 p-4 checkout-summary">
        <span className="text-xl font-semibold px-5 py-3 bg-green-100 text-green-800 rounded-md">
          Summary
        </span>
        <div className="mt-4 flex flex-col gap-3">
          {cart.map(({ product, count }) => (
            <div className="flex justify-between gap-4 w-full">
              <p className="flex-1 text-sm">
                {product.name} <strong>X {count}</strong>
              </p>
              <p>Tk. {product.price * count}</p>
            </div>
          ))}
          <div className="flex justify-between w-full">
            <p className="flex-1">Shipping</p>
            <p>Tk. 50</p>
            <hr />
          </div>
          <div className="flex justify-between w-full">
            <p className="flex-1">Total</p>
            <p>Tk. {total}</p>
            <hr />
          </div>
          <div className="flex justify-between w-full">
            <p className="font-semibold flex-1">Payable Total</p>
            <p>Tk. {total}</p>
            <hr />
          </div>
          <button
            className="w-full bg-green-400 text-white p-3 rounded-md"
            onClick={OnClickOrderNow}
            disabled={loading}
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default connect(MapStateToProps)(Checkout);
