import { useState } from 'react'
import { FireStore } from '../../firebase';

export const useFavorites = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    const AddToFavorites = (prevFavorites, product, uid) => {
        setLoading(true);
        FireStore.collection('favorites').doc(uid).set({ favorites: [...prevFavorites, product] })
            .then(() => setLoading(false))
            .catch(() => {
                setLoading(false);
                setError(true);
            })
    }

    const DeleteFromFavorites = (prevFavorites, product, uid) => {
        const Favorites = [...prevFavorites];
        Favorites.forEach((favorite, index) => {
            if (favorite.id === product.id) Favorites.splice(index, 1)
        })

        setLoading(true);
        FireStore.collection('favorites').doc(uid).set({ favorites: Favorites })
            .then(() => setLoading(false))
            .catch(() => {
                setLoading(false);
                setError(true);
            })
    }

    return (prevFavorites, product, uid, bool) => {
        if (bool) {
            AddToFavorites(prevFavorites, product, uid);
        } else {
            DeleteFromFavorites(prevFavorites, product, uid)
        }

        return { loading, error }
    }
}
