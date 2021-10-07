import { FireStore } from '../firebase';
import * as ActionTypes from './ActionTypes';

export const FetchProducts = () => {
    return async (dispatch) => {
        try {
            await FireStore.collection("products").onSnapshot(snapshot => {
                const Products = []
                snapshot.forEach(doc => {
                    Products.push({
                        ...doc.data(),
                        id: doc.id
                    })
                })
                dispatch({
                    type: ActionTypes.FetchProducts,
                    payload: Products
                })
            })
        } catch {
            console.log("Fetch products failed")
        }
    }
}

export const SetUser = user => {
    return {
        type: ActionTypes.setUser,
        payload: user
    }
}

export const FetchCart = user => {
    return async (dispatch) => {
        try {
            await FireStore.collection('carts').doc(user.uid).onSnapshot(doc => {
                dispatch({
                    type: ActionTypes.fetchCart,
                    payload: doc.data() ? doc.data().cart : []
                })
            })
        } catch (e) {
            // console.log(e, "cart fetch failed")
        }
    }
}

export const FetchFavorites = uid => {
    return async (dispatch) => {
        try {
            FireStore.collection('favorites').doc(uid).onSnapshot(doc => {
                // console.log(doc.data() ? doc.data().favorites : [], "Favorites")
                dispatch({
                    type: ActionTypes.fetchFavorites,
                    payload: doc.data() ? doc.data().favorites : []
                })
            })
        } catch {
            // console.log("favorites fetch failed")
        }
    }
}

export const FetchUserInfo = uid => {
    return async (dispatch) => {
        await FireStore.collection("usersInfo").doc(uid).onSnapshot(doc => {
            if (doc.exists) {
                dispatch({
                    type: ActionTypes.fetchUserInfo,
                    payload: doc.data()
                })
            }
        })
    }
}

export const FetchOrders = uid => {
    return async (dispatch) => {
        await FireStore.collection('orders').doc(uid).onSnapshot(doc => {
            if (doc.exists) {
                dispatch({
                    type: ActionTypes.fetchOrders,
                    payload: doc.data().orders
                })
            }
        })
    }
}

export const FetchSearchResults = () => {
    return async (dispatch) => {
        const searchResults = [];
        const querySnapshot = await FireStore.collection("searchResults").get();
        querySnapshot.forEach(doc => searchResults.push(doc.data()));
        dispatch({
            type: ActionTypes.FETCH_SEARCH_RESULTS,
            payload: searchResults
        })
    }
}