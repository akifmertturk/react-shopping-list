import { createContext, FunctionComponent, useContext, useState } from "react";
import { IProductResponse } from "../models/Product";

type ProductsContextType = {
  productResponseList: IProductResponse[];
  currentPageIndex: number;
  isAllProductsLoaded: boolean;
  nextUrl: string | null;
  addProductResponse: (newProducts: IProductResponse, next: string | null) => void;
  setCurrentPageIndex: React.Dispatch<React.SetStateAction<number>>
  setIsAllProductsLoaded: React.Dispatch<React.SetStateAction<boolean>>
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

interface IProductsProviderProps {
  children: React.ReactNode;
}

export const ProductsProvider: FunctionComponent<IProductsProviderProps> = ({ children }) => {
  // List of all products fetched from API (horizontal and vertical)
  const [productResponseList, setProductResponseList] = useState<IProductResponse[]>([]);
  // Current page index for horizontal and vertical products
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  // Check if all products are loaded to stop fetching new products
  const [isAllProductsLoaded, setIsAllProductsLoaded] = useState<boolean>(false);
  // Next page URL to fetch new products from API
  const [nextUrl, setNextUrl] = useState<string | null>("https://mock.akakce.dev/page.json");

  /**
   * Add new products (response) to the productResponseList and update nextUrl
   * @param newProductResponse 
   * @param next 
   */
  const addProductResponse = (newProductResponse: IProductResponse, next: string | null) => {
    setProductResponseList((prev) => [...prev, newProductResponse]);
    setNextUrl(next);
    if (!next) setIsAllProductsLoaded(true);
  };

  return (
    <ProductsContext.Provider value={{
        productResponseList,
        nextUrl,
        currentPageIndex,
        isAllProductsLoaded,
        addProductResponse,
        setCurrentPageIndex,
        setIsAllProductsLoaded
      }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};