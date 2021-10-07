import { useState } from 'react';
import Loader from '../../../Components/Loader/Loader';
import { Button } from '@material-ui/core';
import SingleReview from './SingleReview';

const ShowReviews = ({ reviews, FindReviews }) => {
    const [numOfReviews, setNumOfReviews] = useState(5);
    let reviewsIndex = -1;

    const showLoadMoreButton = () => {
        if (reviews) {
            if (reviewsIndex < (reviews.length - 1) && reviewsIndex !== -1) {
                return (
                    <Button
                        variant="contained"
                        onClick={() => setNumOfReviews(prevState => prevState + 6)}
                    > Show More
                    </Button>
                )
            }
        }
    }

    return (
        <>
            {reviews ? FindReviews().map(({ photoURL, name, time, review, rating: productRating }, index, array) => {
                if (index <= numOfReviews) {
                    reviewsIndex = index;
                    return (
                        <SingleReview
                            key={index}
                            name={name}
                            time={time}
                            photoURL={photoURL}
                            review={review}
                            productRating={productRating}
                            reviewsArray={array}
                        />
                    )
                } else return null;
            }) : <Loader />}
            {showLoadMoreButton()}
        </>
    )
}

export default ShowReviews
