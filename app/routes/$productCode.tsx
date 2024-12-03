import { LoaderFunctionArgs } from "@remix-run/node";
import ProductDetail from "../components/ProductDetail";

export async function loader({ params }: LoaderFunctionArgs) {
  const response = await fetch(`${process.env.API_URL}/product${params.productCode}.json`);
  if (!response.ok) {
    throw new Response("Not Found", { status: 404 });
  }
  const product = await response.json();
  return product;
}

const ProductDetailPage: React.FC = () => {
  return (
    <ProductDetail />
  );
};

export default ProductDetailPage;