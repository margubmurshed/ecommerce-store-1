import React from 'react';
import Stars from './Stars';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';

const ProductRatingInfo = ({ user, FindRatings, FindReviews, toggle }) => {
    const history = useHistory();

    const AverageRating = () => {
        return FindRatings().length ? (FindRatings().reduce((prevValue, currentValue) => prevValue + currentValue, 0) / FindRatings().length) : 0;
    }

    const getButton = () => {
        return (
            user
                ? <Button color="primary" variant="contained" onClick={toggle}>Write A Review</Button>
                : <Button color="primary" variant="contained" onClick={() => history.push('/login')}>Login</Button>
        )
    }

    return (
        <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-0 md:items-center py-3">
            <div className="flex items-center gap-3 left-side">
                <h3 className="text-4xl">{AverageRating().toFixed(2)}</h3>
                <div>
                    <p>{FindRatings().length} Ratings and {FindReviews().length} Reviews</p>
                    <Stars rating={AverageRating().toFixed(1)} />
                </div>
            </div>
            <div className="right-side">
                {getButton()}
            </div>
        </div>
    )
}

export default ProductRatingInfo
