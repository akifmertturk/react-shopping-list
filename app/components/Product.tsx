import { useNavigate } from "@remix-run/react";
import { IProduct } from "../models/Product";

interface IProductProps {
  product: IProduct;
}

export default function Product({ product }: IProductProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${product.code}`);
  };

  return (
    <button
      key={product.code}
      style={{
        border: "1px solid #ddd",
        padding: "16px",
        borderRadius: "8px",
        minWidth: "150px",
        maxWidth: "400px",
      }}
      onClick={handleClick}
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        style={{ width: "100%", height: "auto", marginBottom: "8px" }}
      />
      <p>{product.name}</p>
      <p>${product.price}</p>
    </button>
  );
}