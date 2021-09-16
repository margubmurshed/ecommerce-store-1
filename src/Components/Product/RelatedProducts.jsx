import { connect } from "react-redux";
import ProductCard from "./ProductCard";

const MapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

const RelatedProducts = ({ catagory, products, productId }) => {
  const Products = products.filter((product) => product.catagory === catagory);
  Products.forEach((product, index) => {
    if (product.id === productId) Products.splice(index, 1);
  });

  return (
    <>
      <div
        className={`flex justify-${
          Products.length === 1 || Products.length === 2 ? "start" : "between"
        } items-center flex-wrap w-full gap-3`}
      >
        {Products.map((product) => (
          <ProductCard product={product} key={Math.random()} />
        ))}
      </div>
    </>
  );
};

export default connect(MapStateToProps)(RelatedProducts);
