import {
  Button, FormControl, InputLabel, MenuItem, Select, TextField
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FireStore } from "../../firebase";
import Alert from '../../Components/Alert';

const MyAccount = () => {
  const { user, userInfo } = useSelector(({ user, userInfo }) => ({ user, userInfo }));
  const { displayName, email, uid, photoURL } = user;
  const [name, setName] = useState(displayName);
  const [emailValue, setEmailValue] = useState(email);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [alternativePhoneNumber, setAlternativePhoneNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [alerts, setAlert] = useState([])

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmailValue(userInfo.email)
      setPhoneNumber(userInfo.phoneNumber)
      setAlternativePhoneNumber(userInfo.alternativePhoneNumber)
      setDeliveryAddress(userInfo.deliveryAddress)
      setDefaultPaymentMethod(userInfo.defaultPaymentMethod)
    }
  }, [userInfo])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert([]);
    setLoading(true);
    await FireStore.collection("usersInfo").doc(uid).set({
      name,
      email,
      phoneNumber,
      alternativePhoneNumber,
      deliveryAddress,
      defaultPaymentMethod
    })
    setLoading(false);
    setAlert([...alerts, { message: "Profile Updated!", color: 'green' }])
    setTimeout(() => setAlert([]), 5000);
  }

  return (
    <>
      <div className="p-5">
        <div className="bg-blue-500 text-white p-3 mb-5 text-center rounded-md">My Account</div>
        {alerts.length ? alerts.map(({ message, color }) => <Alert message={message} color={color} />) : null}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="bg-center bg-cover bg-no-repeat rounded-md" style={{ width: '150px', height: '150px', backgroundImage: `url(${photoURL})` }} />

          <TextField
            type="text"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            required
          />
          <TextField
            type="email"
            label="Email Address"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            variant="outlined"
            required
          />
          <TextField
            type="tel"
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            variant="outlined"
          />
          <TextField
            type="tel"
            label="Alternative Phone Number"
            value={alternativePhoneNumber}
            onChange={(e) => setAlternativePhoneNumber(e.target.value)}
            variant="outlined"
          />
          <TextField
            type="text"
            label="Delivery Address"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            variant="outlined"
          />
          <FormControl variant="outlined">
            <InputLabel id="select-payment-method-label">
              Payment Mehod
            </InputLabel>
            <Select
              labelId="select-payment-method-label"
              value={defaultPaymentMethod}
              onChange={(e) => setDefaultPaymentMethod(e.target.value)}
              label="Payment Method"
            >
              <MenuItem value="cod">Cash On Delivery</MenuItem>
              <MenuItem value="bkash">Bkash</MenuItem>
              <MenuItem value="nagad">Nagad</MenuItem>
              <MenuItem value="rocket">Rocket</MenuItem>
              <MenuItem value="upay">Upay</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" type="submit" disabled={loading}>Save Changes</Button>
        </form>
      </div>
    </>
  );
};

export default MyAccount;
