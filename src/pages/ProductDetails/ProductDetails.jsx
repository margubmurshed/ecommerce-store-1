import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import RelatedProducts from "./RelatedProducts";
import MainDetails from "./MainDetails";
import Description from "./Description";
import Ratings from './Rating/Ratings';
import Loader from '../../Components/Loader/Loader';
import "./ProductDetails.css";

const ProductDetails = () => {
  const { user, cart, products } = useSelector(({ user, cart, products }) => ({ user, cart, products }));
  const { id: productID, name: productName } = useParams();

  const findProduct = (id, name) => {
    return products && products.filter(product => {
      return product.id === id && product.name.split(" ").join("-") === name
    })[0]
  }

  if (products.length) {
    const foundProduct = findProduct(productID, productName, products);
    if (foundProduct) {
      const { catagory, description, id } = foundProduct;
      return (
        <div
          className="bg-gray-200 flex flex-col items-center gap-5 p-2 m-auto"
          style={{ minHeight: "100vh", maxWidth: '1200px' }}
        >
          <MainDetails Product={foundProduct} user={user} cart={cart} />
          <Description description={description} />
          <Ratings productID={productID} />
          <RelatedProducts catagory={catagory} productID={id} />
        </div>
      );
    } else {
      return (
        <div className="w-full h-full flex justify-center items-center">
          Sorry, No Product Found
        </div>
      );
    }
  } else {
    return (
      <div className="flex justify-center p-10">
        <Loader />
      </div>
    );
  }
};

export default ProductDetails;
