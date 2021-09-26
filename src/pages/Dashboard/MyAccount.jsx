import {
  Button, FormControl, InputLabel, MenuItem, Select, TextField
} from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FireStore } from "../../firebase";

const MyAccount = () => {
  const user = useSelector(({ user }) => user);
  const { displayName, email, uid, photoURL } = user;
  const [name, setName] = useState(user ? displayName : "");
  const [emailValue, setEmailValue] = useState(user ? email : "");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [alternativePhoneNumber, setAlternativePhoneNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  const IsChangedMade = () => {
    if (name !== displayName && emailValue !== email && phoneNumber !== "" && alternativePhoneNumber !== "" && deliveryAddress !== "" && defaultPaymentMethod !== "cod") {
      return false
    } else {
      return true;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (IsChangedMade()) {
      console.log("Changes Made")
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
    } else {
      console.log("No Changes Made")
    }
  }

  return (
    <div>
      <div className="p-5">
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
    </div>
  );
};

export default MyAccount;
