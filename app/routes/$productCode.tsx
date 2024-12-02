import { useLoaderData } from "@remix-run/react";
import { IProductDetail } from "../models/Product";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Card, Image, CardBody, Button } from "@nextui-org/react";
import { Rating } from "@mui/material";

export async function loader({ params }: LoaderFunctionArgs) {
  const response = await fetch(`https://mock.akakce.dev/product${params.productCode}.json`);
  if (!response.ok) {
    throw new Response("Not Found", { status: 404 });
  }
  const product = await response.json();
  return product;
}

export default function ProductDetail() {
  const product = useLoaderData() as IProductDetail;
  
  const lastUpdate = product.lastUpdate === "now" ? new Date() : new Date(product.lastUpdate);
  const formattedLastUpdate = isNaN(lastUpdate.getTime()) ? "Şimdi" : lastUpdate.toLocaleString("tr-TR");

  return (
    product ?
    (
      <div className="mt-4 grid gap-2 justify-center">
        <Card className="w-full p-4">
          <CardBody>
            <div className="flex flex-col items-center justify-center">
              {/* PRODUCT CORE DETAILS */}
              <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                {/* IMAGE */}
                <div className="relative col-span-4 md:col-span-4">
                  <Image
                    src={product.imageUrl}
                    width="100%"
                    alt={product.productName}
                  />
                </div>
                {/* DETAILS */}
                <div className="flex flex-col col-span-8 md:col-span-8">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-2">
                      <h3 className="font-semibold text-foreground/90">{product.productName}</h3>
                      <p className="text-small text-foreground/80">{product.price} ₺</p>
                      {product.freeShipping && <p className="text-small text-green-600">Ücretsiz Teslimat</p>}
                      <div className="flex flex-row gap-1 mt-1">
                        {product.storageOptions.map((option) => (
                          <Button key={option} size="sm" variant="ghost" color="default">{option}</Button>
                        ))}
                      </div>
                      
                    </div>
                  </div>
                </div>
                {/* COMMENTS */}
                <div className="flex flex-col col-span-12">
                  <h1 className="text-large font-medium mt-2">{product.badge}</h1>
                  <div className="flex flex-row items-center justify-between mt-1">
                    <Rating name="rating" defaultValue={product.rating} readOnly />
                    <p className="text-small text-foreground/80">{product.countOfPrices} değerlendirme</p>
                  </div >
                  <div className="flex flex-row justify-between">
                    <p className="text-small text-foreground/80">Son Güncelleme:</p>
                    <p className="text-small text-foreground/80">{formattedLastUpdate}</p>
                  </div >
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    ) : (
      <div style={{ padding: "16px" }}>
        <h1>{"Ürün Bulunamadı"}</h1>
      </div>
    )
  );
}
