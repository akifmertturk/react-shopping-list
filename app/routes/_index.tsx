import { useEffect } from "react";
import { ProductListViewModel } from "../viewmodals/ProductListViewModel";
import { useLoaderData } from "@remix-run/react";
import { IProductResponse } from "../models/Product";
import { useProducts } from "../context/ProductsContext";
import ProductsPage from "../components/ProductsPage";

export async function loader() {
  const viewModel = new ProductListViewModel();
  await viewModel.fetchInitialProducts();
  return viewModel;
}

export default function Index() {
  const initialData = useLoaderData() as IProductResponse;
  const { addProductResponse } = useProducts();

  useEffect(() => {
    addProductResponse(initialData, initialData.nextUrl);
  }, []);

  return (
    <div>
      <ProductsPage />
    </div>
  );
}
