export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export function getProductImageUrl(imgUrl) {
  return `${API_BASE_URL}/images/products/${imgUrl}`;
}

export function getBrandImageUrl(imgUrl) {
  return `${API_BASE_URL}/images/brands/${imgUrl}`;
}
