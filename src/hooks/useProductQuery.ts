import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../config/api.config';
import { productService } from '../services/product.service';
import type { ProductQueryParams } from '../types/product.types';

/**
 * Hook customizado para buscar produtos usando React Query
 */
export function useProductQuery(params?: ProductQueryParams) {
  return useQuery({
    queryKey: [...QUERY_KEYS.PRODUCTS, params],
    queryFn: () => productService.getProducts(params),
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 10, // 10 minutos (anteriormente cacheTime)
  });
}
