import { Button } from '@material-ui/core';
import React from 'react';

const ReviewSubmit = ({ rating, review, setReview, setRating, onReviewSubmit, onRatingSubmit }) => {

    const getStarRatingClassName = (starSerial, productRating) => {
        return ((productRating !== null) ? ((starSerial <= productRating) ? 'fas' : 'far') : 'far');
    }

    return (
        <div className="border">
            <form onSubmit={onReviewSubmit}>
                <input
                    type="textarea"
                    colSpan="20"
                    placeholder="Please write your honest opinion and give a rating"
                    className="outline-none p-5 w-full text-sm md:text-base"
                    value={review}
                    onChange={e => setReview(e.target.value)}
                    required
                />
                <hr />
                <div className="flex justify-between items-center p-5">
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((serialNumber, index) => {
                            return (
                                <i
                                    key={index}
                                    className={`${getStarRatingClassName(serialNumber, rating)} fa-star text-yellow-400 text-xl cursor-pointer`}
                                    onClick={() => {
                                        setRating(serialNumber)
                                        onRatingSubmit(serialNumber);
                                    }}
                                />
                            )
                        })}
                    </div>
                    <div>
                        <Button type="submit" color="primary" variant="outlined">Submit</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ReviewSubmit
