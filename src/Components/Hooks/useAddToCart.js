import { useState } from "react";
import { FireStore } from "../../firebase";

export const useAddToCart = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const existInCart = (nextCartItemId, prevCartItems) => {
        return !!prevCartItems.filter(({ product }) => product.id === nextCartItemId).length;
    }

    const UpdateCart = (prevCartItems, nextCartItem) => {
        const cartItemExists = existInCart(nextCartItem.id, prevCartItems);

        if (prevCartItems.length) {
            prevCartItems.forEach(({ count }) => {
                if (cartItemExists) {
                    count++;
                } else {
                    prevCartItems.push({ product: nextCartItem, count: 1 });
                }
            })
        } else {
            prevCartItems.push({ product: nextCartItem, count: 1 })
        }
        return [...prevCartItems];
    }

    function AddProductToCart(product, user, cart) {
        if (user) {
            setLoading(true)
            FireStore.collection("carts")
                .doc(user.uid)
                .set({
                    cart: UpdateCart(cart, product)
                }).then(() => {
                    setLoading(false)
                    error && setError(false);
                }).catch(() => {
                    setLoading(false)
                    setError(true);
                })
        }
    }

    return (product, user, cart) => {
        AddProductToCart(product, user, cart);
        return {
            loading,
            error
        }
    }
};