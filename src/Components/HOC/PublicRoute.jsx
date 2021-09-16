import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const MapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const PublicRoute = ({ user, children, path }) => {
    return !user ? <Route path={path} exact>{children}</Route> : <Redirect to="/"/>;
};

export default connect(MapStateToProps)(PublicRoute);