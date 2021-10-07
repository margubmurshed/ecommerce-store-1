import { Chip } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { textShortner } from '../Navbar/NavSlider';
import ProductImage from './ProductImage';
import ProductButtons from './ProductButton';

const ProductCard = ({ product }) => {
    const { user, cart, favorites } = useSelector(({ user, cart, favorites }) => ({ user, cart, favorites }))
    const { name, catagory, price, productImage, id } = product;

    return (
        <div className="flex flex-col bg-white shadow-md" style={{ flexBasis: '300px' }} key={Math.random()}>
            <ProductImage name={name} id={id} productImage={productImage} />
            <div className="flex flex-col justify-between flex-1">
                <div className="p-3 flex flex-col gap-y-2">
                    <h3 className="text-base">{textShortner(name, 60)}</h3>
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

export default ProductCard;
