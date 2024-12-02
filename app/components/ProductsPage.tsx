import { useState } from "react";
import { useProducts } from "~/context/ProductsContext";
import Product from "./Product";
import { IProductResponse } from "../models/Product";
import { Button } from "@nextui-org/react";

export default function ProductsPage() {
  const { productResponseList, nextUrl, currentPageIndex, isAllProductsLoaded, addProductResponse, setCurrentPageIndex } = useProducts();
  const [loading, setLoading] = useState(false);

  const onBackClick = () => {
    if (currentPageIndex === 0) {
      return;
    }
    setCurrentPageIndex((prev) => prev - 1);
  };

  const onNextClick = async () => {
    const nextPageIndex = currentPageIndex + 1;
    if (!isAllProductsLoaded && nextUrl && nextPageIndex <= productResponseList.length - 1) {
      setLoading(true);
      const response = await fetch(nextUrl); // Retrieve new products from API
      const data = await response.json();
      addProductResponse(data as IProductResponse, data.nextUrl); // Update context with new data and nextUrl
      setLoading(false);
    }
    setCurrentPageIndex(nextPageIndex);
  };

  return (
    <div className="p-4">
      {/* Horizontal Product List */}
      <div className="px-28 mb-4">
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
          {productResponseList[currentPageIndex]?.horizontalProductList?.map((product) => (
            <div key={product.code} className="flex-shrink-0 snap-center w-[calc(25%-1rem)] max-w-xs">
              <Product product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Vertical Product List */}
      <div className="grid grid-cols-2 gap-4">
        {productResponseList[currentPageIndex]?.productList?.map((product) => (
          <Product key={product.code} product={product} />
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center m-2 gap-2">
       {currentPageIndex > 0 && (
        <Button
         size="md"
         variant="ghost"
         color="default"
         onPress={onBackClick}
        >
         {loading ? "Yükleniyor..." : "Geri"}
        </Button>
       )}
        {productResponseList[currentPageIndex]?.nextUrl && (
          <Button
            size="md"
            variant="ghost"
            color="default"
            onPress={onNextClick}
            disabled={loading}
          >
            {loading ? "Yükleniyor..." : "İleri"}
          </Button>
        )}
      </div>
    </div>
  );
}
