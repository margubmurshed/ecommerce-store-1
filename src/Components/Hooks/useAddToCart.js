import { useState } from "react";
import { FireStore } from "../../firebase";

export const useAddToCart = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const UpdateCart = (cart, product) => {
        let cartProducts = [...cart];
        if (cartProducts.length) {
            cartProducts.forEach(item => {
                if (item.product.id === product.id) {
                    item.count++;
                } else {
                    const IsPresentInCart = cartProducts.filter(cartItem => cartItem.product.id === product.id).length;
                    !IsPresentInCart && cartProducts.push({ product, count: 1 });
                }
            })
        } else {
            cartProducts.push({ product, count: 1 })
        }
        return cartProducts;
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