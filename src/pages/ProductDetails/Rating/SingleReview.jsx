import { Fragment } from 'react';
import Stars from './Stars';
import date from 'date-and-time';

const SingleReview = ({ name, time, photoURL, productRating, review, index, reviewsArray }) => {
    return (
        <Fragment>
            <div className="py-5">
                <div className="flex flex-col md:flex-row gap-2">
                    <div className="flex flex-row md:flex-col gap-2" style={{ flexBasis: '20%' }}>
                        <img src={photoURL} alt='user' className="w-14 h-14 md:w-20 md:h-20 rounded-full text-xs" />
                        <div className="flex flex-col flex-1">
                            <p className="text-sm md:text-base">{name}</p>
                            <p className="text-xs font-light">{date.format(new Date(time), 'DD MMM YYYY')}</p>
                            {productRating && <Stars rating={productRating} />}
                        </div>
                    </div>
                    <div className="reviewText flex-1 md:bg-gray-100 rounded-md text-sm md:text-base p-2" style={{ height: 'fit-content' }}>
                        <p>{review}</p>
                    </div>
                </div>
            </div>
            {(index !== reviewsArray.length - 1) && <hr />}
        </Fragment>
    )
}

export default SingleReview
