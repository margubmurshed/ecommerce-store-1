import {
    FormControlLabel, Radio, RadioGroup, TextField
} from "@material-ui/core";
import BkashLogo from "../../assets/img/bkashLogo.png";
import NagadLogo from "../../assets/img/nagadLogo.svg";
import RocketLogo from "../../assets/img/rocketLogo.png";
import UpayLogo from "../../assets/img/upayLogo.jpg";

const Checkout = ({ values, setMethods }) => {
    const { name, phoneNumber, alternativePhoneNumber, address, paymentMethod } = values;
    const { setName, setPhoneNumber, setAlternativePhoneNumber, setAddress, setPaymentMethod } = setMethods;

    return (
        <div className="checkout-details flex flex-col gap-5 bg-white p-5 rounded-md">
            <span className="text-xl font-semibold px-5 py-3 bg-blue-100 text-blue-800 rounded-md">Contact Info</span>
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
                    <div className="flex gap-3 items-center py-5">
                        <FormControlLabel
                            value="bkash"
                            control={<Radio />}
                            label="Bkash"
                            color="primary"
                        />
                        <img src={BkashLogo} alt="bkashLogo" width="50px" />
                    </div>
                    <div className="flex gap-3 items-center py-5">
                        <FormControlLabel
                            value="nagad"
                            control={<Radio />}
                            label="Nagad"
                            color="primary"
                        />
                        <img src={NagadLogo} alt="nagadLogo" width="50px" />
                    </div>
                    <div className="flex gap-3 items-center py-5">
                        <FormControlLabel
                            value="rocket"
                            control={<Radio />}
                            label="Rocket"
                            color="primary"
                        />
                        <img src={RocketLogo} alt="rocketLogo" width="50px" />
                    </div>
                    <div className="flex gap-3 items-center py-5">
                        <FormControlLabel
                            value="upay"
                            control={<Radio />}
                            label="Upay"
                            color="primary"
                        />
                        <img src={UpayLogo} alt="bkashLogo" width="50px" />
                    </div>
                </RadioGroup>
            </div>
        </div>
    )
};

export default Checkout;
