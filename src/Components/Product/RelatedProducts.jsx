import { useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";

const RelatedProducts = ({ catagory, productId }) => {
  const AllProducts = useSelector(({ products }) => products);
  const CatagoryProducts = AllProducts.filter((product) => product.catagory === catagory);
  CatagoryProducts.forEach((product, index) => {
    if (product.id === productId) CatagoryProducts.splice(index, 1);
  });

  return (
    <>
      <div
        className={`flex justify-${CatagoryProducts.length === 1 || CatagoryProducts.length === 2 ? "start" : "between"
          } items-center flex-wrap w-full gap-3`}
      >
        {CatagoryProducts.map((product) => (
          <ProductCard product={product} key={Math.random()} />
        ))}
      </div>
    </>
  );
};

export default RelatedProducts;
