/**
 * Configurações da API
 * Centraliza URLs e constantes relacionadas à API
 */

export const API_CONFIG = {
  BASE_URL: 'https://dummyjson.com',
  TIMEOUT: 10000,
  ENDPOINTS: {
    PRODUCTS: '/products',
    PRODUCT_BY_ID: (id: number) => `/products/${id}`,
    SEARCH_PRODUCTS: '/products/search',
  },
} as const;

export const QUERY_KEYS = {
  PRODUCTS: ['products'] as const,
  PRODUCT: (id: number) => ['product', id] as const,
} as const;
