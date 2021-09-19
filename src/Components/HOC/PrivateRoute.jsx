import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const MapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const PrivateRoute = ({ user, children, path }) => {
  return user ? (
    <Route path={path} exact>
      {children}
    </Route>
  ) : (
    <Redirect to="/" />
  );
};

export default connect(MapStateToProps)(PrivateRoute);
