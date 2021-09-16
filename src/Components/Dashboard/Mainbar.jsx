import { Route } from "react-router-dom";
import Favorites from "./Favorites";
import MyAccount from "./MyAccount";
import Orders from "./Orders";

const MainBar = () => {
  return (
    <div
      className="h-full bg-green-200 p-5 overflow-y-auto"
      style={{ flex: "0.8" }}
    >
      <Route path="/dashboard/my-account" exact>
        <MyAccount />
      </Route>
      <Route path="/dashboard/orders" exact>
        <Orders />
      </Route>
      <Route path="/dashboard/favorites" exact>
        <Favorites />
      </Route>
    </div>
  );
};

export default MainBar;
