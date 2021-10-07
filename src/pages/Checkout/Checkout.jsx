import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { FireStore } from "../../firebase";
import "./Checkout.css";
import UserInfoForm from './UserInfoForm';
import Summary from './Summary';
import Alert from "../../Components/Alert";
import Loader from "../../Components/Loader/Loader";

const Checkout = () => {
  const location = useLocation();
  const history = useHistory();
  const { user, userInfo } = useSelector(({ user, userInfo }) => ({ user, userInfo }));
  const [name, setName] = useState(user.displayName || '');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [alternativePhoneNumber, setAlternativePhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [alerts, setAlert] = useState([]);

  useEffect(() => {
    document.title = "Checkout | E-commerce"
  }, [])

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setPhoneNumber(userInfo.phoneNumber)
      setAlternativePhoneNumber(userInfo.alternativePhoneNumber)
      setAddress(userInfo.deliveryAddress)
      setPaymentMethod(userInfo.defaultPaymentMethod)
    }
  }, [userInfo])

  const getPreviousOrders = () => {
    return new Promise(resolve => {
      FireStore.collection("orders")
        .doc(user.uid)
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

  const resetCart = () => {
    FireStore.collection("carts").doc(user.uid).set({ cart: [] });
  };

  const isFilled = () => {
    if (
      name !== "" &&
      phoneNumber !== "" &&
      address !== "" &&
      paymentMethod !== ""
    ) return true;
    else return false;
  };

  const createOrder = () => {
    const { cart, total } = location.state;
    return {
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
  }

  const submitOrder = async () => {
    if (isFilled()) {
      setAlert([]);
      setLoading(true);
      const PreviousOrders = await getPreviousOrders();
      const Order = createOrder();
      try {
        await FireStore.collection("orders")
          .doc(user.uid)
          .set({ orders: [...PreviousOrders, Order] });
        resetCart();
        setLoading(false);
        history.push({
          pathname: `/orderconfirmation/${user.uid}`,
          state: {
            uid: user.uid,
          },
        });
      } catch {
        setAlert([{ message: 'Action Failed', color: 'red' }]);
        setLoading(false);
      }
    } else {
      setAlert([{ message: 'Please fill all fields', color: 'red' }]);
    }
  };

  if (loading) return <Loader />

  if (location.state) {
    const { cart, total } = location.state;
    return (
      <div className="p-3">
        {alerts.length ? alerts.map(({ message, color }) => <Alert key={message} message={message} color={color} remove={() => setAlert([])} />) : null}
        <div className="flex flex-col lg:flex-row gap-3 relative">
          <UserInfoForm
            values={{ name, phoneNumber, alternativePhoneNumber, address, paymentMethod }}
            setMethods={{ setName, setPhoneNumber, setAlternativePhoneNumber, setAddress, setPaymentMethod }}
          />
          <Summary
            cart={cart}
            total={total}
            loading={loading}
            submitOrder={submitOrder}
          />
        </div>
      </div>
    )
  } else {
    history.push('/');
    return null;
  };
};

export default Checkout;
