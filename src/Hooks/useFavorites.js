import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FireStore } from '../firebase';

const useFavorites = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { favorites, user } = useSelector(({ favorites, user }) => ({ favorites, user }));


    const AddToFavorites = (product) => {
        setLoading(true);
        FireStore.collection('favorites').doc(user.uid).set({ favorites: [...favorites, product] })
            .then(() => setLoading(false))
            .catch(() => {
                setLoading(false);
                setError(true);
            })
    }

    const DeleteFromFavorites = (product) => {
        const Favorites = [...favorites];
        Favorites.forEach((favorite, index) => {
            if (favorite.id === product.id) Favorites.splice(index, 1)
        })

        setLoading(true);
        FireStore.collection('favorites').doc(user.uid).set({ favorites: Favorites })
            .then(() => setLoading(false))
            .catch(() => {
                setLoading(false);
                setError(true);
            })
    }

    return (product, bool) => {
        if (bool) {
            AddToFavorites(product);
        } else {
            DeleteFromFavorites(product)
        }

        return { loading, error }
    }
}

export default useFavorites;