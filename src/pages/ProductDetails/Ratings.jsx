import { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FireStore } from '../../firebase';
import Alert from '../../Components/Alert/Alert';

const Ratings = ({ productId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(null);
    const [alerts, setAlert] = useState([]);
    const { user, userInfo } = useSelector(({ user, userInfo }) => ({ user, userInfo }));
    const history = useHistory();

    useEffect(() => {
        getProductReviews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId])

    const getUserName = () => {
        return userInfo ? userInfo.name : user.displayName;
    }

    const getProductReviews = () => {
        FireStore.collection('reviews').doc(productId).collection('reviews').onSnapshot(snapshot => {
            const reviews = [];
            snapshot.forEach(doc => reviews.push({ userId: doc.id, ...doc.data() }));
            setReviews(reviews);
        })
    }

    const getStarRatingClassName = (starSerial, productRating) => {
        return ((productRating !== null) ? ((starSerial <= productRating) ? 'fas' : 'far') : 'far');
    }

    const getPreviousUserReview = () => {
        return new Promise(resolve => {
            FireStore.collection('reviews').doc(productId).collection('reviews').doc(user.uid).get()
                .then(doc => resolve(doc.data()))
        })
    }

    const onRatingSubmit = async (rating) => {
        const prevReview = await getPreviousUserReview();
        const data = prevReview
            ? { ...prevReview, rating, name: getUserName(), photoURL: user.photoURL, time: new Date().getTime() }
            : { rating, name: getUserName(), photoURL: user.photoURL, time: new Date().getTime() };
        setAlert([]);
        FireStore.collection('reviews').doc(productId).collection('reviews').doc(user.uid).set(data)
            .then(() => {
                getProductReviews();
                setAlert([{ message: `Rating has been ${prevReview ? 'updated' : 'submitted'}`, color: 'green' }]);
            })
    }

    const onReviewSubmit = async (e) => {
        e.preventDefault();
        const prevReview = await getPreviousUserReview();
        const data = prevReview
            ? {
                ...prevReview,
                review,
                name: getUserName(),
                photoURL: user.photoURL, time: new Date().getTime()
            } : {
                review,
                name: getUserName(),
                photoURL: user.photoURL, time: new Date().getTime()
            };
        setAlert([]);
        FireStore.collection('reviews').doc(productId).collection('reviews').doc(user.uid).set(data)
            .then(() => {
                getProductReviews();
                setReview('');
                setAlert([{ message: `Review has been ${prevReview ? 'updated' : 'submitted'}`, color: 'green' }]);
            })
    }

    const FindReviews = () => {
        const OnlyReviews = [];
        reviews.forEach(review => {
            if (review.review) {
                OnlyReviews.push(review)
            }
        })
        return OnlyReviews
    }

    const FindRatings = () => {
        const OnlyRatings = [];
        reviews.forEach(review => {
            if (review.rating) {
                OnlyRatings.push(review.rating)
            }
        })
        return OnlyRatings;
    }

    const AverageRating = () => {
        return FindRatings().length ? (FindRatings().reduce((prevValue, currentValue) => prevValue + currentValue, 0) / FindRatings().length) : 0;
    }

    return (
        <div className="w-full bg-white p-5">
            {alerts.length ? alerts.map(({ message, color }) => <Alert message={message} color={color} key={Math.random()} />) : null}
            <h2 className="text-xl font-semibold">Reviews and Ratings</h2>
            <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-0 md:items-center py-3">
                <div className="flex items-center gap-3 left-side">
                    <h3 className="text-4xl">{AverageRating().toFixed(2)}</h3>
                    <div>
                        <p>{FindRatings().length} Ratings and {FindReviews().length} Reviews</p>
                        {[1, 2, 3, 4, 5].map((serialNumber, index) => {
                            return (
                                <i
                                    key={index}
                                    className={`${getStarRatingClassName(serialNumber, AverageRating().toFixed(1))} fa-star text-yellow-400 text-sm cursor-pointer`}
                                />
                            )
                        })}
                    </div>
                </div>
                <div className="right-side">
                    {user
                        ? <Button color="primary" variant="contained" onClick={() => setIsOpen(!isOpen)}>Write A Review</Button>
                        : <Button color="primary" variant="contained" onClick={() => history.push('/login')}>Login</Button>}
                </div>
            </div>
            {isOpen && (
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
            )}
            {reviews ? FindReviews().map(({ photoURL, name, time, review, rating: productRating }, index, array) => (
                <>
                    <div className="py-5" key={index}>
                        <div className="flex gap-2">
                            <div>
                                <img src={photoURL} alt={name} width="70px" className="rounded-full mb-2" />
                                <p>{name}</p>
                                <p className="text-sm font-light">{new Date(time).toDateString()}</p>
                                {productRating && ([1, 2, 3, 4, 5].map((serialNumber, index) => {
                                    return (
                                        <i
                                            key={index}
                                            className={`${getStarRatingClassName(serialNumber, productRating)} fa-star text-yellow-400 text-sm cursor-pointer`}
                                        />
                                    )
                                }))}
                            </div>
                            <div className="flex-1 bg-gray-100 rounded-md text-sm md:text-base p-2" style={{ height: 'fit-content' }}>
                                <p>{review}</p>
                            </div>
                        </div>
                    </div>
                    {(index !== array.length - 1) && <hr />}
                </>
            )) : 'Loading..'}
        </div>
    )
}

export default Ratings
