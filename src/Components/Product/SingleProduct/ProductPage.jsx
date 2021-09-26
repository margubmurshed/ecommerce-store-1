import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { FindProduct } from "../FindProduct";
import RelatedProducts from "../RelatedProducts";
import MainDetails from "./MainDetails";
import Description from "./Description";
import "./ProductPage.css";

const MapStateToProps = (state) => {
  return {
    user: state.user,
    cart: state.cart,
    products: state.products,
  };
};

const ProductPage = ({ products, user, cart }) => {
  const { id: productID, name: ProductName } = useParams();

  console.log("Product Page Render");

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

export default connect(MapStateToProps)(ProductPage);
