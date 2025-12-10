import './App.css';
import { MutationExamples } from './examples/MutationExamples';
import { useProductQuery } from './hooks/useProductQuery';

function App() {
  const { data, isLoading, error } = useProductQuery();

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Carregando produtos...</p>
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <div className="error-container">
        <h2>Erro ao carregar produtos</h2>
        <p>{error?.message ?? 'Erro desconhecido'}</p>
      </div>
    );
  }

  return (
    <main className="container">
      <header className="header">
        <h1>🛍️ Nossos Produtos</h1>
        <p className="subtitle">Encontrados {data?.products.length} produtos incríveis para você</p>
      </header>

      {/* <section className="products-grid">
        {data?.products.map((product) => (
          <article key={product.id} className="product-card">
            <div className="image-container">
              <img src={product.thumbnail} alt={product.title} />
            </div>
            <div className="product-info">
              <h3 className="product-title">{product.title}</h3>
              <div className="product-footer">
                <span className="product-price">${product.price.toFixed(2)}</span>
                <button className="btn-add-cart">Adicionar</button>
              </div>
            </div>
          </article>
        ))}
      </section> */}
      <MutationExamples />
    </main>
  );
}

export default App;
