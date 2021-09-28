import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { FirebaseAuth } from './firebase';
import { FetchCart, FetchFavorites, FetchProducts, FetchUserInfo, SetUser } from './Redux/ActionCreator';
import Cart from './pages/Cart/Cart'
import Checkout from './pages/Checkout/Checkout';
import Dashboard from './pages/Dashboard/Dashboard';
import PrivateRoute from './Components/HOC/PrivateRoute';
import PublicRoute from './Components/HOC/PublicRoute';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import FullProductDisplay from './pages/ProductDetails/ProductDetails';
import SuccessConfirmation from './pages/SuccessConfiramtion/SuccessConfirmation';
import SearchResults from './pages/SearchResults/SearchResults';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = FirebaseAuth.onAuthStateChanged(user => {
      if (user) {
        dispatch(SetUser(user))
        dispatch(FetchCart(user))
        dispatch(FetchFavorites(user.uid))
        dispatch(FetchUserInfo(user.uid))
      }
    });
    dispatch(FetchProducts());
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="font-poppins bg-gray-200" style={{ minHeight: "100vh" }}>
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <PublicRoute path="/login">
            <Login />
          </PublicRoute>
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path="/checkout">
            <Checkout />
          </PrivateRoute>
          <PrivateRoute path="/orderconfirmation/:uid">
            <SuccessConfirmation />
          </PrivateRoute>
          <PrivateRoute path="/cart">
            <Cart />
          </PrivateRoute>
          <Route path="/products/:name/:id" exact>
            <FullProductDisplay />
          </Route>
          <Route path="/search/:searchTitle" exact>
            <SearchResults />
          </Route>
          <Route exact>
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </>
  )
}

export default App
