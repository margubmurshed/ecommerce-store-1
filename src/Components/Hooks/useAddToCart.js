import { useState } from "react";
import { useHistory } from "react-router";
import { FireStore } from "../../firebase";
import { useSelector } from 'react-redux';

export const useAddToCart = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const history = useHistory();
    const { user } = useSelector(({ user }) => ({ user }));

    const existInCart = (nextProductId, prevCartItems) => {
        return !!(prevCartItems.filter(({ product }) => product.id === nextProductId).length);
    }

    const IncreaseCart = (prevCartItems, nextProduct) => {
        const InitialCartItem = { product: nextProduct, count: 1 };

        if (prevCartItems.length) {
            const UpdatedCartItems = [...prevCartItems];
            UpdatedCartItems.forEach((cartItem) => {
                if (cartItem.product.id === nextProduct.id) {
                    cartItem.count++;
                } else {
                    [...UpdatedCartItems, { product: nextProduct }].forEach(Item => {
                        const exists = existInCart(Item.product.id, UpdatedCartItems);
                        if (!exists) {
                            UpdatedCartItems.push(InitialCartItem)
                        }
                    })
                }
            })
            return UpdatedCartItems;
        } else {
            return [InitialCartItem];
        }
    }

    const DecreaseCart = (prevCartItems, nextProduct) => {
        const UpdatedCartItems = [...prevCartItems];
        UpdatedCartItems.forEach((cartItem, index) => {
            if (cartItem.product.id === nextProduct.id) {
                if (cartItem.count > 1) {
                    cartItem.count--;
                } else {
                    UpdatedCartItems.splice(index, 1)
                }
            }
        })
        return UpdatedCartItems;
    }

    const UpdateCart = (prevCartItems, nextProduct, type) => {
        if (type === 'increase') {
            return IncreaseCart(prevCartItems, nextProduct)
        } else {
            return DecreaseCart(prevCartItems, nextProduct);
        }
    }

    function AddProductToCart(cart, product, type) {
        if (user) {
            setLoading(true);
            const updatedCart = UpdateCart(cart, product, type);
            FireStore.collection("carts")
                .doc(user.uid)
                .set({
                    cart: updatedCart
                }).then(() => {
                    setLoading(false)
                    error && setError(false);
                }).catch(() => {
                    setLoading(false)
                    setError(true);
                })
        } else {
            history.push('/login');
        }
    }

    return (cart, product, type) => {
        AddProductToCart(cart, product, type);
        return {
            loading,
            error
        }
    }
};