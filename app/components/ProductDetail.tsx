import { useLoaderData } from "@remix-run/react";
import { IProductDetail } from "../models/Product";
import { Image, Button, Card } from "@nextui-org/react";
import { Rating } from "@mui/material";
import { formatDate, formatPrice } from "../utils/format";


const ProductDetail = () => {
  const product = useLoaderData() as IProductDetail;
  const formattedLastUpdate = formatDate(product.lastUpdate);
  const formattedPrice = formatPrice(product.price);

  return (
    product ?
    (
      <div className="flex mt-4 gap-2 justify-center pl-32 pr-32">
        <Card className="flex w-full p-16" radius="sm">
          <div className="flex flex-col w-full items-center justify-center">
            {/* PRODUCT DETAILS */}
            <div className="w-full grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
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
                  <div className="flex flex-col w-full">
                    {/* NAME & RATING */}
                    <div className="flex flex-col w-full mb-2">
                      <b className="text-sm font-medium" style={{ color: "#3a6acb" }}>{product.mkName}</b>
                      <h1 className="text-foreground/90 mb-2">{product.productName}</h1>
                      {/* BADGE & RATING */}
                      <div className="flex flex-row gap-x-5">
                        <div className="pr-1 pl-1" style={{ backgroundColor: "#FEFAE4" }}>
                          <b className="text-xs font-medium">{product.badge}</b>
                        </div>
                        <div className="flex flex-row items-center justify-between">
                          <Rating name="rating" size="small" defaultValue={product.rating} readOnly />
                          <p className="text-xs text-gray-500">({product.countOfPrices} değerlendirme)</p>
                        </div >
                      </div>
                    </div>
                    {/* OPTIONS */}
                    <span>
                      <span className="text-sm mb-2">Seçenekler:</span>
                      <div className="flex flex-row gap-1">
                        {product.storageOptions.map((option) => (
                          <Button key={option} size="md" variant="ghost" radius="sm" color="default">{option}</Button>
                        ))}
                      </div>
                    </span>
                    <hr className="w-full my-5" style={{ color: "#999" }} />
                    {/* PRICE & SHIPPING */}
                    <span className="mb-5">
                        <span className="mr-3 text-xl font-bold">
                          {formattedPrice} <i className="text-xs font-normal">TL</i>
                        </span>
                        {product.freeShipping && <span className="text-green-600">Ücretsiz kargo</span>}
                    </span>
                    {/* LAST UPDATE */}
                    <span className="text-xs" style={{ color: "#999" }}>
                      Son Güncelleme: <span>{formattedLastUpdate}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    ) : (
      <div style={{ padding: "16px" }}>
        <h1>{"Ürün Bulunamadı"}</h1>
      </div>
    )
  );
}

export default ProductDetail;