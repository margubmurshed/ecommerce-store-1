import { Link } from "react-router-dom";

const ProductImage = ({ name, id, productImage }) => {
  return (
    <Link to={`/products/${name.split(" ").join("-")}/${id}`}>
      <div
        className="w-full h-52 bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${productImage})` }}
      />
    </Link>
  );
};

export default ProductImage;
