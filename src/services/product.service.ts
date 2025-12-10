import { API_CONFIG } from '../config/api.config';
import { httpClient } from '../lib/http-client';
import type { Product, ProductQueryParams, ProductsResponse } from '../types/product.types';

/**
 * Serviço de produtos
 * Camada de serviço que abstrai as chamadas à API
 */
export class ProductService {
  private readonly baseUrl = API_CONFIG.BASE_URL;

  /**
   * Busca todos os produtos
   */
  async getProducts(params?: ProductQueryParams): Promise<ProductsResponse> {
    const queryParams = new URLSearchParams();

    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.skip) queryParams.append('skip', params.skip.toString());
    if (params?.select) queryParams.append('select', params.select.join(','));

    const url = `${this.baseUrl}${API_CONFIG.ENDPOINTS.PRODUCTS}${
      queryParams.toString() ? `?${queryParams.toString()}` : ''
    }`;

    return httpClient.get<ProductsResponse>(url);
  }

  /**
   * Busca um produto específico por ID
   */
  async getProductById(id: number): Promise<Product> {
    const url = `${this.baseUrl}${API_CONFIG.ENDPOINTS.PRODUCT_BY_ID(id)}`;
    return httpClient.get<Product>(url);
  }

  /**
   * Busca produtos por termo de pesquisa
   */
  async searchProducts(query: string): Promise<ProductsResponse> {
    const url = `${this.baseUrl}${API_CONFIG.ENDPOINTS.SEARCH_PRODUCTS}?q=${encodeURIComponent(
      query
    )}`;
    return httpClient.get<ProductsResponse>(url);
  }
}

// Instância singleton do serviço
export const productService = new ProductService();
