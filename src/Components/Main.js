import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { FirebaseAuth } from '../firebase';
import { FetchCart, FetchFavorites, FetchProducts, FetchUserInfo, SetUser } from '../Redux/ActionCreator';
import Cart from './Cart/Cart';
import Checkout from './Checkout/Checkout';
import Dashboard from './Dashboard/Dashboard';
import PrivateRoute from './HOC/PrivateRoute';
import PublicRoute from './HOC/PublicRoute';
import Home from './Home/Home';
import Login from './Login/Login';
import Navbar from './Navbar/Navbar';
import FullProductDisplay from './Product/Single Product/ProductPage';
import SuccessConfirmation from './SuccessConfiramtion/SuccessConfirmation';

const MapStateToProps = state => {
    console.log(state, "redux state")
    return {
        user: state.user
    }
}

const MapDispatchToProps = dispatch => {
    return {
        FetchProductDispatcher: () => dispatch(FetchProducts()),
        SetUserDispatcher: user => dispatch(SetUser(user)),
        FetchCartDispatcher: user => dispatch(FetchCart(user)),
        FetchFavoritesDispatcher: uid => dispatch(FetchFavorites(uid)),
        FetchUserInfoDispatcher: uid => dispatch(FetchUserInfo(uid))
    }
}

const Main = ({FetchProductDispatcher, SetUserDispatcher, FetchCartDispatcher, FetchFavoritesDispatcher, FetchUserInfoDispatcher}) => {

    console.log("Main Component Render");

    useEffect(() => {
        const unsubscribe = FirebaseAuth.onAuthStateChanged(user => {
            if (user) {
                SetUserDispatcher(user)
                FetchCartDispatcher(user)
                FetchFavoritesDispatcher(user.uid)
                FetchUserInfoDispatcher(user.uid)
            }
        });
        FetchProductDispatcher();
        return unsubscribe;
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
                    <Route exact>
                        <Redirect to="/" />
                    </Route>
                </Switch>
            </div>
        </>
    )
}

export default connect(MapStateToProps, MapDispatchToProps)(Main);
