import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { FirebaseAuth, FireStore } from './firebase';
import { FetchCart, FetchFavorites, FetchProducts, FetchUserInfo, SetUser } from './Redux/ActionCreator';
import Cart from './pages/Cart/Cart';
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

  const getUser = async (uid) => {
    return new Promise(resolve => {
      FireStore.collection('users').doc(uid).get().then(doc => resolve(doc.data()))
    })
  }

  const createUser = async (user) => {
    const prevUser = await getUser(user.uid);
    if (!prevUser) {
      const userDetails = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        creationTime: new Date().getTime()
      }
      FireStore.collection('users').doc(user.uid).set(userDetails)
    }
  }

  useEffect(() => {
    const unsubscribe = FirebaseAuth.onAuthStateChanged(user => {
      dispatch(SetUser(user))
      if (user) {
        createUser(user)
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
        <Switch>
          <Route path="/" exact>
            <Navbar />
            <Home />
          </Route>
          <PublicRoute path="/login">
            <Login />
          </PublicRoute>
          <PrivateRoute path="/dashboard">
            <Navbar />
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path="/checkout">
            <Navbar />
            <Checkout />
          </PrivateRoute>
          <PrivateRoute path="/orderconfirmation/:uid">
            <Navbar />
            <SuccessConfirmation />
          </PrivateRoute>
          <PrivateRoute path="/cart">
            <Navbar />
            <Cart />
          </PrivateRoute>
          <Route path="/products/:name/:id" exact>
            <Navbar />
            <FullProductDisplay />
          </Route>
          <Route path="/search/:searchTitle" exact>
            <Navbar />
            <SearchResults />
          </Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </>
  )
}

export default App
