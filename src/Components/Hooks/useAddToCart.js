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
            //console.log('there is previous cartItems')
            prevCartItems.forEach((cartItem) => {
                if (cartItem.product.id === nextProduct.id) {
                    //next add to cart product is present in the cart so let's just increase the count
                    cartItem.count += 1;
                } else {
                    //next add to cart product is not present in the cart. 
                    //so we have the products which is not next product and the next product which needs to be added to cart
                    [...prevCartItems, { product: nextProduct }].forEach(Item => {
                        //in the cart, there are some products which are not next product. we have nothing to do with it
                        const exists = existInCart(Item.product.id, prevCartItems);
                        if (!exists) {
                            //product which is not present in the prevCart will be pushed to prevCart
                            prevCartItems.push(InitialCartItem)
                        }
                    })
                }
            })
        } else {
            // console.log('no previous cartItems');
            prevCartItems.push(InitialCartItem)
        }

        return prevCartItems;
    }

    const DecreaseCart = (prevCartItems, nextProduct) => {
        prevCartItems.forEach((cartItem, index, array) => {
            console.log(cartItem, index, array, 'from decreament')
            if (cartItem.product.id === nextProduct.id) {
                console.log("product is in the cart")
                if (cartItem.count > 1) {
                    console.log('product count is more than one');
                    cartItem.count--;
                    console.log('product count has been decreased');
                } else {
                    console.log('product count is 1 and should be removed the whole');
                    prevCartItems.splice(index, 1)
                    console.log('product has been removed full');
                }
            }
        })
        console.log('decreased Cart Items', prevCartItems)
        return prevCartItems;
    }

    const UpdateCart = (prevCartItems, nextProduct, type) => {
        if (type === 'increase') {
            return IncreaseCart(prevCartItems, nextProduct)
        } else {
            return DecreaseCart(prevCartItems, nextProduct);
        }
    }

    function AddProductToCart(cart, product, type) {
        console.log('add to product called', product, type)
        if (user) {
            setLoading(true);
            const updatedCart = UpdateCart(cart, product, type);
            console.log(updatedCart, 'updatedCart')
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
                    // console.log('error found on addtocart')
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