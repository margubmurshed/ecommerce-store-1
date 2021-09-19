import { connect } from "react-redux";
import ProductCard from "../Product/ProductCard";

const MapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

const Products = (props) => {
  const { products } = props;
  return (
    <div className="flex flex-row flex-wrap justify-center gap-3 z-0">
      {products.length ? (
        products.map((item) => (
          <ProductCard product={item} key={Math.random()} />
        ))
      ) : (
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default connect(MapStateToProps)(Products);
