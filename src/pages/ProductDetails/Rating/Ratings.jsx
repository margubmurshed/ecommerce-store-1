import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FireStore } from '../../../firebase';
import Alert from '../../../Components/Alert';
import ShowReviews from './ShowReviews';
import ReviewSubmit from './ReviewSubmit';
import RatingInfo from './ProductRatingInfo';

const Ratings = ({ productID }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [reviews, setReviews] = useState(null);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(null);
    const [alerts, setAlert] = useState([]);
    const { user, userInfo } = useSelector(({ user, userInfo }) => ({ user, userInfo }));

    useEffect(() => {
        getProductReviews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productID])

    const toggle = () => {
        setIsOpen(prevState => !prevState);
    }

    const getUserName = () => {
        return userInfo ? userInfo.name : user.displayName;
    }

    const getProductReviews = () => {
        FireStore.collection('reviews').doc(productID).collection('reviews').onSnapshot(snapshot => {
            const reviews = [];
            snapshot.forEach(doc => reviews.push({ userId: doc.id, ...doc.data() }));
            setReviews(reviews);
        })
    }

    const getPreviousUserReview = () => {
        return new Promise(resolve => {
            FireStore.collection('reviews').doc(productID).collection('reviews').doc(user.uid).get()
                .then(doc => resolve(doc.data()))
        })
    }

    const onRatingSubmit = async (rating) => {
        const prevReview = await getPreviousUserReview();
        const data = prevReview
            ? { ...prevReview, rating, name: getUserName(), photoURL: user.photoURL, time: new Date().getTime() }
            : { rating, name: getUserName(), photoURL: user.photoURL, time: new Date().getTime() };

        setAlert([]);
        FireStore.collection('reviews').doc(productID).collection('reviews').doc(user.uid).set(data)
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
        FireStore.collection('reviews').doc(productID).collection('reviews').doc(user.uid).set(data)
            .then(() => {
                getProductReviews();
                setReview('');
                setAlert([{ message: `Review has been ${prevReview ? 'updated' : 'submitted'}`, color: 'green' }]);
            })
    }

    const FindReviews = () => {
        const OnlyReviews = [];
        if (reviews) {
            reviews.forEach(review => {
                if (review.review) {
                    OnlyReviews.push(review)
                }
            })
        }
        return OnlyReviews
    }

    const FindRatings = () => {
        const OnlyRatings = [];
        if (reviews) {
            reviews.forEach(review => {
                if (review.rating) {
                    OnlyRatings.push(review.rating)
                }
            })
        }
        return OnlyRatings;
    }



    return (
        <div className="w-full bg-white p-5">
            {alerts.length ? alerts.map(({ message, color }) => (
                <Alert
                    message={message}
                    color={color}
                    key={Math.random()}
                    remove={() => setAlert([])}
                />
            )) : null}
            <h2 className="text-xl font-semibold">Reviews and Ratings</h2>
            <RatingInfo
                user={user}
                FindRatings={FindRatings}
                FindReviews={FindReviews}
                toggle={toggle}
            />
            {isOpen && (
                <ReviewSubmit
                    rating={rating}
                    review={review}
                    onReviewSubmit={onReviewSubmit}
                    onRatingSubmit={onRatingSubmit}
                    setReview={setReview}
                    setRating={setRating}
                />
            )}
            <ShowReviews reviews={reviews} FindReviews={FindReviews} />
        </div>
    )
}

export default Ratings
