import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { FirebaseAuth } from "../../firebase";
import { SetUser } from "../../Redux/ActionCreator";
import "./Dashboard.css";
import Mainbar from './Mainbar';
import Sidebar from "./Sidebar";
import MyAccount from './MyAccount';
import Favorites from './Favorites';
import Orders from './Orders';

const MapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const MapDispatchToProps = (dispatch) => {
  return {
    setUserDispatcher: (user) => dispatch(SetUser(user)),
  };
};

const Dashboard = ({ setUserDispatcher, user }) => {
  const { url, path } = useRouteMatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => (document.title = "Dashboard | E-commerce"), []);

  const SignOut = async () => {
    try {
      setLoading(true);
      await FirebaseAuth.signOut();
      setLoading(false);
      setUserDispatcher(null);
    } catch {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full flex border" style={{ height: "90vh" }}>
        <Sidebar user={user} />
        <Switch>
          <Route path="/dashboard" render={() => <h2>Select a menu</h2>}/>
          <Route path="/dashboard/my-account" exact component={MyAccount}/>
          <Route path="/dashboard/favorites" exact component={Favorites}/>
          <Route path="/dashboard/orders" exact component={Orders}/>
        </Switch>
      </div>
    </>
  );
};

export default connect(MapStateToProps, MapDispatchToProps)(Dashboard);
