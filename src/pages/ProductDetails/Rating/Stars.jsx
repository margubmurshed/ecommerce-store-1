import React from 'react'

const Stars = ({ rating, color = 'yellow' }) => {

    const getStarRatingClassName = (starSerial, productRating) => {
        return ((productRating !== null) ? ((starSerial <= productRating) ? 'fas' : 'far') : 'far');
    }

    return (
        <div>
            {[1, 2, 3, 4, 5].map((serialNumber, index) => {
                return (
                    <i
                        key={index}
                        className={`${getStarRatingClassName(serialNumber, rating)} fa-star text-${color}-400 text-sm cursor-pointer`}
                    />
                )
            })}
        </div>
    )
}

export default Stars
