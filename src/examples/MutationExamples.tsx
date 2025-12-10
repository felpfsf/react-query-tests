import { useState } from 'react';
import {
  useCreateProduct,
  useDeleteProduct,
  useUpdateProduct,
  useUpdateProductOptimistic,
} from '../hooks/useProductMutations';
import { useProductQuery } from '../hooks/useProductQuery';
import type { CreateProductDto } from '../types/product.types';

export function MutationExamples() {
  const { data: productsData } = useProductQuery({ limit: 5 });
  const [newProductTitle, setNewProductTitle] = useState('');

  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();
  const optimisticUpdateMutation = useUpdateProductOptimistic();

  const handleCreateProduct = () => {
    const newProduct: CreateProductDto = {
      title: newProductTitle || 'Novo Produto Teste',
      price: 99.99,
      description: 'Produto criado via mutation',
      thumbnail: 'https://via.placeholder.com/150',
      stock: 100,
      brand: 'Test Brand',
      category: 'smartphones',
    };

    createMutation.mutate(newProduct, {
      onSuccess: (product) => {
        alert(`✅ Produto "${product.title}" criado com ID: ${product.id}`);
        setNewProductTitle('');
      },
    });
  };

  const handleUpdateProduct = (productId: number) => {
    updateMutation.mutate({
      id: productId,
      title: 'Produto Atualizado!',
      price: 149.99,
    });
  };

  const handleOptimisticUpdate = (productId: number) => {
    optimisticUpdateMutation.mutate({
      id: productId,
      title: '⚡ Atualizado Otimisticamente',
      price: 199.99,
    });
  };

  const handleDeleteProduct = (productId: number, productTitle: string) => {
    if (confirm(`Tem certeza que deseja deletar "${productTitle}"?`)) {
      deleteMutation.mutate(productId);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🔧 Exemplos de Mutations</h1>

      <section style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ddd' }}>
        <h2>1️⃣ Criar Novo Produto</h2>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <input
            type="text"
            value={newProductTitle}
            onChange={(e) => setNewProductTitle(e.target.value)}
            placeholder="Nome do produto"
            style={{ flex: 1, padding: '0.5rem' }}
          />
          <button onClick={handleCreateProduct} disabled={createMutation.isPending}>
            {createMutation.isPending ? '⏳ Criando...' : '➕ Criar'}
          </button>
        </div>
      </section>

      <section>
        <h2>2️⃣ Lista de Produtos</h2>
        {productsData?.products.slice(0, 3).map((product) => (
          <div
            key={product.id}
            style={{ padding: '1rem', marginBottom: '1rem', border: '1px solid #ddd' }}
          >
            <h3>{product.title}</h3>
            <p>Preço: ${(product.price + 5).toFixed(2)}</p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => handleUpdateProduct(product.id)}>✏️ Atualizar</button>
              <button onClick={() => handleOptimisticUpdate(product.id)}>⚡ Update Otimista</button>
              <button onClick={() => handleDeleteProduct(product.id, product.title)}>
                🗑️ Deletar
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
