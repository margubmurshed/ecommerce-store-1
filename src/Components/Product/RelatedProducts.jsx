import { useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";

const RelatedProducts = ({ catagory, productId }) => {
  const AllProducts = useSelector(({ products }) => products);
  const CatagoryProducts = AllProducts.filter((product) => product.catagory === catagory);
  CatagoryProducts.forEach((product, index) => {
    if (product.id === productId) CatagoryProducts.splice(index, 1);
  });

  if (!CatagoryProducts.length) return null;

  return (
    <>
      <div className="bg-white p-5 shadow-md bg-gray-100 w-full">
        <p className="text-2xl font-semibold mb-5">Related Products</p>
        <div
          className={`flex ${CatagoryProducts.length === 1 || CatagoryProducts.length === 2 ? "md:justify-start" : "md:justify-between"
            } justify-center items-center flex-wrap w-full gap-3`}
        >
          {CatagoryProducts.map((product, index) => {
            if (index <= 7) {
              return <ProductCard product={product} key={Math.random()} />
            } else return null;
          })}
        </div>
      </div>
    </>
  );
};

export default RelatedProducts;
