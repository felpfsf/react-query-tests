import { API_CONFIG } from '../config/api.config';
import { httpClient } from '../lib/http-client';
import type {
  CreateProductDto,
  Product,
  ProductQueryParams,
  ProductsResponse,
  UpdateProductDto,
} from '../types/product.types';

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

  /**
   * Cria um novo produto
   */
  async createProduct(data: CreateProductDto): Promise<Product> {
    const url = `${this.baseUrl}${API_CONFIG.ENDPOINTS.PRODUCTS}/add`;
    return httpClient.post<Product>(url, data);
  }

  /**
   * Atualiza um produto existente
   */
  async updateProduct(data: UpdateProductDto): Promise<Product> {
    const { id, ...updateData } = data;

    if (id === undefined) {
      throw new Error('ID do produto é obrigatório para atualização.');
    }

    const url = `${this.baseUrl}${API_CONFIG.ENDPOINTS.PRODUCT_BY_ID(id)}`;
    return httpClient.put<Product>(url, updateData);
  }

  /**
   * Atualiza parcialmente um produto existente
   */
  async patchProduct(data: UpdateProductDto): Promise<Product> {
    const { id, ...patchData } = data;

    if (id === undefined) {
      throw new Error('ID do produto é obrigatório para atualização parcial.');
    }

    const url = `${this.baseUrl}${API_CONFIG.ENDPOINTS.PRODUCT_BY_ID(id)}`;
    return httpClient.patch<Product>(url, patchData);
  }

  /**
   * Deleta um produto por ID
   */
  async deleteProduct(id: number): Promise<void> {
    const url = `${this.baseUrl}${API_CONFIG.ENDPOINTS.PRODUCT_BY_ID(id)}`;
    return httpClient.delete<void>(url);
  }
}

// Instância singleton do serviço
export const productService = new ProductService();
