import { useState } from "react";
import { useProducts } from "~/context/ProductsContext";
import Product from "./Product";
import { IProductResponse } from "../models/Product";

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
      const response = await fetch(nextUrl); // Sıradaki sayfa verisini çek
      const data = await response.json();
      addProductResponse(data as IProductResponse, data.nextUrl); // Yeni ürünleri ve nextUrl'i güncelle
      setLoading(false);
    }
    setCurrentPageIndex(nextPageIndex);
  };

  return (
    <div style={{ padding: "16px" }}>
      <h1>Ürün Listesi</h1>

      {/* Horizontal Product List */}
      <h2>Yatay Ürünler</h2>
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "16px",
          paddingBottom: "16px",
        }}
      >
        {productResponseList[currentPageIndex]?.horizontalProductList?.map((product) => (
          <Product key={product.code} product={product} />
        ))}
      </div>

      {/* Vertical Product List */}
      <h2>Dikey Ürünler</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px",
        }}
      >
        {productResponseList[currentPageIndex]?.productList?.map((product) => (
          <Product key={product.code} product={product} />
        ))}
      </div>

      {/* Daha Fazla Göster Butonu */}
      <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
       {currentPageIndex > 0 && (
         <button
          onClick={onBackClick}
          disabled={loading}
          style={{
            padding: "8px 16px",
            backgroundColor: "#6c757d",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {loading ? "Yükleniyor..." : "Geri"}
        </button>
       )}
        {productResponseList[currentPageIndex]?.nextUrl && (
          <button
            onClick={onNextClick}
            disabled={loading}
            style={{
              padding: "8px 16px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {loading ? "Yükleniyor..." : "İleri"}
          </button>
        )}
      </div>
    </div>
  );
}
