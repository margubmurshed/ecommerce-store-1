import * as ActionTypes from './ActionTypes';
const INITIAL_STATE = {
    products: [],
    favorites: [],
    cart: [],
    favorites: [],
    orders: [],
    user: null,
    userInfo: null
}

const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case ActionTypes.FetchProducts:
            return {
                ...state,
                products: action.payload
            }

        case ActionTypes.setUser:
            return {
                ...state,
                user: action.payload
            }

        case ActionTypes.fetchCart:
            return {
                ...state,
                cart: action.payload
            }

        case ActionTypes.fetchFavorites:
            return {
                ...state,
                favorites: action.payload
            }

        case ActionTypes.fetchUserInfo:
            return {
                ...state,
                userInfo: action.payload
            }

        case ActionTypes.fetchOrders:
            return {
                ...state,
                orders: action.payload
            }

        default: return state;
    }
}

export default Reducer;