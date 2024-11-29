import { IProduct } from "~/models/Product";
import { fetchProducts } from "~/services/api";

export class ProductListViewModel {
  horizontalProducts: IProduct[] = [];
  productList: IProduct[] = [];
  nextUrl: string | null = null;

  /**
   * Fetch initial products and update horizontalProducts, productList and nextUrl
   */
  async fetchInitialProducts(): Promise<void> {
    const response = await fetchProducts();
    this.horizontalProducts = response.horizontalProductList;
    this.productList = response.productList;
    this.nextUrl = response.nextUrl;
  }

  /**
   * Fetch more products from nextUrl and append to productList
   * @returns true: New products added, false: No next page
   */
  async fetchMoreProducts(): Promise<boolean> {
    if (!this.nextUrl) return false;
    const response = await fetchProducts(this.nextUrl);
    this.productList = [...this.productList, ...response.productList]; // Append new products
    this.nextUrl = response.nextUrl; // Update Next Url
    return true;
  }
}
