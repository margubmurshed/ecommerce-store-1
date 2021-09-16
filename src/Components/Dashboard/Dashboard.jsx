import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FirebaseAuth } from "../../firebase";
import { SetUser } from "../../Redux/ActionCreator";
import "./Dashboard.css";
import Orders from "./Orders";
import Sidebar from "./Sidebar";

// import Mainbar from "./Mainbar";

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
        <div className="h-full overflow-y-auto dashboard-mainbar">
          <Orders />
        </div>
      </div>
      
    </>
  );
};

export default connect(MapStateToProps, MapDispatchToProps)(Dashboard);
