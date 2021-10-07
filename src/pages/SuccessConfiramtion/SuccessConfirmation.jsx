import { useLocation, useHistory } from "react-router-dom";
import SuccessImg from '../../assets/img/success.svg'

const SuccessConfirmation = () => {
    const location = useLocation();
    const history = useHistory();
    const { uid } = location.state;
    if (!uid) history.push("/");
    else {
        return (
            <div className="w-full bg-gray-200 flex justify-center items-center p-5" style={{ minHeight: '90vh' }}>
                <div className="flex flex-col justify-center items-center">
                    <p className="text-center text-semibold text-green-600 p-5 rounded-md bg-green-100 mb-10">Order has been successfully submitted! <br /> It will take minimum 2-3 Working days to deliver, Thank you!</p>
                    <img src={SuccessImg} alt="success" width="400px" />
                </div>
            </div>
        )
    }
}

export default SuccessConfirmation
