import { useState } from "react";
import { useProducts } from "~/context/ProductsContext";
import Product from "./Product";
import { IProduct, IProductResponse } from "../models/Product";
import { Button } from "@nextui-org/react";

/**
 * Horizontal Product List Component to display products horizontally
 */
const HorizontalProductList = ({ products }: { products: IProduct[]}) => (
  <div className="px-28 mb-4">
    <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
      {products.map((product) => (
        <div key={product.code} className="flex-shrink-0 snap-center w-[calc(25%-1rem)] max-w-xs">
          <Product product={product} />
        </div>
      ))}
    </div>
  </div>
);

/**
 * Vertical Product List Component to display products vertically
 * @param {IProduct[]} products - List of products to display
 */
const VerticalProductList = ({ products }: { products: IProduct[]}) => (
  <div className="grid grid-cols-2 gap-4 px-32">
    {products.map((product) => (
      <Product key={product.code} product={product} />
    ))}
  </div>
);

export default function ProductsPage() {
  const { productResponseList, nextUrl, currentPageIndex, isAllProductsLoaded, addProductResponse, setCurrentPageIndex } = useProducts();
  const [loading, setLoading] = useState(false); // Loading state to disable pagination buttons while loading
  const [error, setError] = useState<string | null>(null);

  const onBackClick = () => {
    // Prevent going back if current page index is 0
    if (currentPageIndex === 0) {
      return;
    }
    // Go back to previous page by decreasing current page index
    setCurrentPageIndex((prev) => prev - 1);
  };

  const onNextClick = async () => {
    const nextPageIndex = currentPageIndex + 1; // Calculate next page index
    // Check if next page index is less than or equal to the length of productResponseList, if not, fetch new products
    if (!isAllProductsLoaded && nextUrl && nextPageIndex <= productResponseList.length - 1) {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(nextUrl);
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        addProductResponse(data as IProductResponse, data.nextUrl);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Beklenmedik bir hata oluştu.");
        }
      } finally {
        setLoading(false);
      }
    }
    // Go to next page by increasing current page index
    setCurrentPageIndex(nextPageIndex);
  };

  return (
    <div>
      {/* Horizontal Product List */}
      <HorizontalProductList products={productResponseList[currentPageIndex]?.horizontalProductList || []} />

      {/* Vertical Product List */}
      <VerticalProductList products={productResponseList[currentPageIndex]?.productList || []} />

      {error && <p className="text-red-500 mt-4">{"Bir hata oluştu. Lütfen daha sonra tekrar deneyin."}</p>}

      {/* Pagination Buttons */}
      <div className="flex justify-center m-2 gap-2">
       {currentPageIndex > 0 && (
        <Button
         size="md"
         variant="ghost"
         color="default"
         disabled={loading}
         onPress={onBackClick}
        >
         {"Geri"}
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
            {"İleri"}
          </Button>
        )}
      </div>
    </div>
  );
}
