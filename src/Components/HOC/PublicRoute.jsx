import { useSelector } from "react-redux";
import { Route, useLocation, Redirect } from "react-router-dom";

const PublicRoute = ({ children, path }) => {
  const { from } = useLocation().state || { from: '/' };
  const user = useSelector(({ user }) => user);
  return !user ? <Route path={path} exact>{children}</Route> : <Redirect to={from} />
};

export default PublicRoute;
