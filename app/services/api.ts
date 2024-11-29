import { IProductResponse } from "../models/Product";

export const fetchProducts = async (
  url = "https://mock.akakce.dev/page.json"
): Promise<IProductResponse> => {
  const response = await fetch(url);
  return response.json();
};
