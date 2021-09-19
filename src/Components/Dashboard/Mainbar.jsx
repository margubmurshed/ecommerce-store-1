import { useParams } from "react-router-dom";
import Favorites from "./Favorites";
import MyAccount from "./MyAccount";
import Orders from "./Orders";

const MainBar = () => {
  const { name } = useParams();

  let component;
  switch (name) {
    case "my-account":
      component = <MyAccount />;
      break;
    case "orders":
      component = <Orders />;
      break;
    case "favorites":
      component = <Favorites />;
      break;
    default:
      component = <h2>No Component Found</h2>;
  }

  return (
    <div
      className="h-full bg-green-200 p-5 overflow-y-auto"
      style={{ flex: "0.8" }}
    >
      {component}
    </div>
  );
};

export default MainBar;
