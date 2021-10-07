import { useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router-dom";

const PrivateRoute = ({ children, path }) => {
  const user = useSelector(({ user }) => user);
  const location = useLocation();
  return (
    <>
      {user ? (
        <Route path={path} exact>
          {children}
        </Route>
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: location.pathname } }} />
      )}
    </>
  )
};

export default PrivateRoute;
