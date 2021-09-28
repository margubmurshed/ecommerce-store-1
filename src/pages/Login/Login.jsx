import { useEffect, useState } from "react";
import { FirebaseAuth, GoogleAuthProviderInstance } from "../../firebase";
import GoogleLogo from "../../assets/img/googleLogo.png";

const Login = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Login | E-commerce";
  }, []);

  const SignInWithGoogleHandler = async () => {
    try {
      setLoading(true);
      await FirebaseAuth.signInWithPopup(GoogleAuthProviderInstance);
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 w-full h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center bg-white shadow-md p-5">
        <a
          href="/"
          className="font-bold text-2xl px-5 py-3 rounded-xl transition-all"
        >
          E-
          <span className="text-blue-600 font-semibold lowercase">
            Commerce
          </span>
        </a>
        <div>
          <button
            className="flex justify-center items-center shadow-md px-4 py-3 cursor-pointer hover:bg-gray-100 transition-all"
            onClick={SignInWithGoogleHandler}
            disabled={loading}
          >
            <img src={GoogleLogo} alt="googlelogo" width="40px" />
            <p className="text-gray-600">Sign In With Google</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
