import { useSelector } from "react-redux";
import ProductCard from "../../Components/Product/ProductCard";

const Products = () => {
  const products = useSelector(({ products }) => products);
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

export default Products;
