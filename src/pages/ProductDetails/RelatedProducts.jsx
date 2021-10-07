import { useSelector } from "react-redux";
import ProductCard from "../../Components/ProductCard/ProductCard";

const RelatedProducts = ({ catagory, productID }) => {
  const products = useSelector(({ products }) => products);
  const catagoryProducts = products.filter((product) => product.catagory === catagory);
  catagoryProducts.forEach((product, index) => {
    if (product.id === productID) catagoryProducts.splice(index, 1);
  });

  if (!catagoryProducts.length) return null;
  return (
    <>
      <div className="bg-white p-5 shadow-md bg-white w-full">
        <p className="text-2xl font-semibold mb-5">Related Products</p>
        <div
          className={`flex ${catagoryProducts.length === 1 || catagoryProducts.length === 2 ? "md:justify-start" : "md:justify-between"
            } justify-center items-center flex-wrap w-full gap-3`}
        >
          {catagoryProducts.map((product, index) => {
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
