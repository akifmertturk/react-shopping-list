import { useLoaderData } from "@remix-run/react";
import { IProductDetail } from "../models/Product";
import { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ params }: LoaderFunctionArgs) {
  console.log('params:', params);
  const response = await fetch(`https://mock.akakce.dev/product${params.productCode}.json`);
  if (!response.ok) {
    throw new Response("Not Found", { status: 404 });
  }
  const product = await response.json();
  console.log('Product:', product);
  return product;
}

export default function ProductDetail() {
  console.log('Product Detail Page');
  const product = useLoaderData() as IProductDetail;

  return (
    product ?
    (
      <div style={{ padding: "16px" }}>
        <h1>{product.mkName}</h1>
        <img
          src={product.imageUrl}
          alt={product.mkName}
          style={{ width: "360px", marginBottom: "16px" }}
        />
        <p>
          <strong>Fiyat:</strong> ${product.price}
        </p>
        <p>
          <strong>Puan:</strong> {product.rating}
        </p>
      </div>
    ) : (
      <div style={{ padding: "16px" }}>
        <h1>Ürün Bulunamadı</h1>
      </div>
    )
  );
}
