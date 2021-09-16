import { Chip } from '@material-ui/core';
import { connect } from 'react-redux';
import ProductImage from './Product Card/ProductImage';
import ProductButtons from './Product Card/ProductButton';

const MapStateToProps = state => {
    return {
        favorites: state.favorites,
        user: state.user,
        cart: state.cart
    }
}

const Product = ({ product, user, cart, favorites }) => {
    const { name, catagory, price, productImage, id } = product;

    return (
        <div className="flex flex-col bg-white shadow-md" style={{ flexBasis: '300px' }} key={Math.random()}>
            <ProductImage name={name} id={id} productImage={productImage} />
            <div className="flex flex-col justify-between flex-1">
                {/* Product Details */}
                <div className="p-3 flex flex-col gap-y-2">
                    <h3 className="text-base">{name}</h3>
                    <div className="flex justify-between items-center">
                        <Chip
                            label={catagory}
                            color="primary"
                            variant="outlined"
                            clickable
                            className="w-1/4"
                        />
                        <span className="text-xl font-semibold">৳{price}</span>
                    </div>
                </div>
                <ProductButtons
                    favorites={favorites}
                    user={user}
                    product={product}
                    cart={cart}
                />
            </div>
        </div>
    )
}

export default connect(MapStateToProps)(Product)
