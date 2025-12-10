import { QUERY_KEYS } from '@/config/api.config';
import { productService } from '@/services/product.service';
import {
  type CreateProductDto,
  type Product,
  type ProductsResponse,
  type UpdateProductDto,
} from '@/types/product.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * Hook para criar um novo produto
 * Invalida automaticamente a query(lista) de produtos após a criação
 */
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductDto) => productService.createProduct(data),
    onSuccess: (newProduct) => {
      // Invalida e refetch a query de produtos
      // queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCTS });

      queryClient.setQueriesData<ProductsResponse>({ queryKey: QUERY_KEYS.PRODUCTS }, (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          products: [newProduct, ...oldData.products],
          total: oldData.total + 1,
        };
      });

      // Opcional: Adiciona o produto criado ao cache da query de produtos
      queryClient.setQueryData(QUERY_KEYS.PRODUCT(newProduct.id), newProduct);

      console.log('Produto criado com sucesso:', newProduct);
    },
    onError: (error) => {
      console.error('Erro ao criar produto:', error);
    },
  });
}

/**
 * Hook para atualizar um produto existente
 * Invalida tanto a lista qto o produto
 */
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProductDto) => productService.updateProduct(data),
    onSuccess: (updatedProduct) => {
      // Invalida e refetch a query de produtos
      // queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCTS });

      queryClient.setQueriesData<ProductsResponse>({ queryKey: QUERY_KEYS.PRODUCTS }, (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          products: oldData.products.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          ),
        };
      });

      // Invalida o produto atualizado no cache
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PRODUCT(updatedProduct.id),
      });

      console.log('Produto atualizado com sucesso:', updatedProduct);
    },
    onError: (error) => {
      console.error('Erro ao atualizar produto:', error);
    },
  });
}

/**
 * Hook para atualizar parcialmente um produto
 * Útil qdo atualizar apenas alguns campos
 */
export function usePatchProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProductDto) => productService.patchProduct(data),
    onSuccess: (patchedProduct) => {
      // queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCTS });
      // queryClient.invalidateQueries({
      //   queryKey: QUERY_KEYS.PRODUCT(patchedProduct.id),
      // });

      queryClient.setQueriesData<ProductsResponse>({ queryKey: QUERY_KEYS.PRODUCTS }, (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          products: oldData.products.map((product) =>
            product.id === patchedProduct.id ? patchedProduct : product
          ),
        };
      });

      console.log('Produto atualizado parcialmente com sucesso:', patchedProduct);
    },
    onError: (error) => {
      console.error('Erro ao atualizar parcialmente o produto:', error);
    },
  });
}

/**
 * Hook avançado
 * Atualiza a UI imediatamente antes da resposta do servidor (otimista)
 * Reverte a atualização em caso de erro
 */
export function useUpdateProductOptimistic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProductDto) => productService.updateProduct(data),
    // Antes da mutação, salva o estado anterior e atualiza o cache otimisticamente
    onMutate: async (updatingProduct) => {
      // Cancela queries em andamento
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.PRODUCT(updatingProduct.id) });

      // Salva o valor anterior
      const previousProduct = queryClient.getQueryData<Product>(
        QUERY_KEYS.PRODUCT(updatingProduct.id)
      );

      queryClient.setQueriesData<ProductsResponse>({ queryKey: QUERY_KEYS.PRODUCTS }, (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          products: oldData.products.map((product) =>
            product.id === updatingProduct.id ? { ...product, ...updatingProduct } : product
          ),
        };
      });

      // Atualiza o cache otimisticamente
      if (previousProduct) {
        queryClient.setQueryData<Product>(QUERY_KEYS.PRODUCT(updatingProduct.id), {
          ...previousProduct,
          ...updatingProduct,
        });
      }

      return { previousProduct };
    },
    // Em caso de erro, reverte para o estado anterior
    onError: (error, updatingProduct, context) => {
      if (context?.previousProduct) {
        queryClient.setQueryData<Product>(
          QUERY_KEYS.PRODUCT(updatingProduct.id),
          context.previousProduct
        );
      }

      console.error('Erro ao atualizar produto otimisticamente:', error);
    },

    // Sempre executa um refetch para garantir sincronização
    onSettled: (_, __, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PRODUCT(variables.id),
      });
    },
  });
}

/**
 * Hook para deletar um produto
 * Remove o produto do cache após o sucesso
 */
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => productService.deleteProduct(id),
    onSuccess: (deletedProduct, productId) => {
      // Invalida a query de produtos
      // queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCTS });

      queryClient.setQueriesData<ProductsResponse>({ queryKey: QUERY_KEYS.PRODUCTS }, (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          products: oldData.products.filter((product) => product.id !== productId),
          total: oldData.total - 1,
        };
      });

      // Remove o produto deletado do cache
      queryClient.removeQueries({
        queryKey: QUERY_KEYS.PRODUCT(productId),
      });

      console.log('Produto deletado com sucesso:', deletedProduct);
    },
    onError: (error) => {
      console.error('Erro ao deletar produto:', error);
    },
  });
}
