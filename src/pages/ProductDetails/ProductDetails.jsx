import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FindProduct } from "../../Components/Product/FindProduct";
import RelatedProducts from "../../Components/Product/RelatedProducts";
import MainDetails from "./MainDetails";
import Description from "./Description";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { user, cart, products } = useSelector(({ user, cart, products }) => ({ user, cart, products }));
  const { id: productID, name: ProductName } = useParams();

  if (products.length) {
    const FoundProduct = FindProduct(productID, ProductName, products);
    if (FoundProduct) {
      const { catagory, description, id } = FoundProduct;
      return (
        <div
          className="bg-gray-200 flex flex-col items-center gap-5 py-10"
          style={{ minHeight: "100vh" }}
        >
          <MainDetails Product={FoundProduct} user={user} cart={cart} />
          <Description description={description} />
          <div
            className="bg-white p-10 shadow-md m-auto"
            style={{ maxWidth: "80%" }}
          >
            <RelatedProducts catagory={catagory} productId={id} />
          </div>
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
      <div className="w-full h-full flex justify-center items-center">
        Loading...
      </div>
    );
  }
};

export default ProductDetails;
