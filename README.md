# 🚀 Projeto de Estudo: React Query com TypeScript e Vite

Este projeto foi criado para praticar e explorar o uso do **React Query (TanStack Query)** em conjunto com React, TypeScript e Vite, seguindo **boas práticas modernas** de arquitetura e padrões de projeto.

## 📚 Tecnologias Utilizadas

- **React 18+**: Biblioteca para construção de interfaces de usuário
- **TypeScript**: Superset do JavaScript com tipagem estática
- **Vite**: Ferramenta de build rápida e moderna
- **TanStack Query (React Query)**: Gerenciamento de estados assíncronos e cache
- **Axios**: Cliente HTTP para requisições
- **DummyJSON API**: API de teste para simulação de dados

## 🎯 Objetivo do Projeto

O objetivo principal deste projeto é demonstrar:

- ✅ Uso avançado do React Query (queries, mutations, cache)
- ✅ Arquitetura em camadas (Adapter Pattern)
- ✅ Separação de responsabilidades (Services, Hooks, Types)
- ✅ Invalidação inteligente de cache
- ✅ Optimistic Updates
- ✅ Boas práticas de TypeScript e React
- ✅ Gerenciamento eficiente de estados assíncronos

## 📁 Estrutura do Projeto

```plaintext
src/
├── api/                      # [Deprecated] API antiga (mantida para retrocompatibilidade)
│   └── products.api.ts
├── config/                   # Configurações centralizadas
│   └── api.config.ts        # URLs, endpoints e query keys
├── examples/                 # Componentes de exemplo
│   └── MutationExamples.tsx # Exemplos de mutations e invalidação
├── hooks/                    # Custom hooks do React Query
│   ├── useProductQuery.ts   # Hook para queries (GET)
│   └── useProductMutations.ts # Hooks para mutations (POST/PUT/DELETE)
├── lib/                      # Bibliotecas e utilitários
│   ├── http-client.ts       # Adapter HTTP (encapsula axios)
│   └── utils.ts             # Funções utilitárias
├── services/                 # Camada de serviços
│   └── product.service.ts   # Lógica de negócio de produtos
├── types/                    # Tipos TypeScript
│   └── product.types.ts     # Interfaces e tipos de produtos
├── App.tsx                   # Componente principal
└── main.tsx                  # Entry point da aplicação
```

## 🏗️ Arquitetura e Padrões

### **1. Adapter Pattern** (`lib/http-client.ts`)

Encapsula o Axios em uma interface própria, facilitando:

- 🔄 Troca de biblioteca HTTP sem afetar o código
- 🧪 Testes isolados
- 🛡️ Tratamento global de erros
- 📦 Singleton para instância única

```typescript
// Exemplo de uso
const data = await httpClient.get<Product[]>('/products');
```

### **2. Service Layer** (`services/product.service.ts`)

Centraliza toda a lógica de comunicação com a API:

- 📡 CRUD completo (Create, Read, Update, Delete)
- 🎯 Métodos semânticos e auto-documentados
- 🔒 Type-safe com TypeScript
- 🧩 Reutilizável em toda aplicação

```typescript
// Exemplo
const products = await productService.getAllProducts({ limit: 10 });
```

### **3. Custom Hooks** (`hooks/`)

Abstrai a complexidade do React Query:

- 🪝 **useProductQuery**: Para buscar dados (GET)
- 🔧 **useCreateProduct**: Para criar produtos
- ✏️ **useUpdateProduct**: Para atualizar produtos
- 🗑️ **useDeleteProduct**: Para deletar produtos
- ⚡ **useUpdateProductOptimistic**: Atualização otimista

### **4. Configurações Centralizadas** (`config/api.config.ts`)

- 🌐 URLs base da API
- 🔗 Endpoints organizados
- 🔑 Query keys padronizadas
- ⚙️ Configurações de cache

## 🎨 Funcionalidades Implementadas

### **Queries (Busca de Dados)**

```typescript
const { data, isLoading, error } = useProductQuery({ 
  limit: 10, 
  skip: 0 
});
```

### **Mutations (Modificação de Dados)**

#### Criar Produto

```typescript
const createMutation = useCreateProduct();
createMutation.mutate({ 
  title: 'Novo Produto', 
  price: 99.99 
});
```

#### Atualizar Produto

```typescript
const updateMutation = useUpdateProduct();
updateMutation.mutate({ 
  id: 1, 
  title: 'Produto Atualizado' 
});
```

#### Atualização Otimista (UI instantânea)

```typescript
const optimisticMutation = useUpdateProductOptimistic();
optimisticMutation.mutate({ 
  id: 1, 
  price: 149.99 
});
```

#### Deletar Produto

```typescript
const deleteMutation = useDeleteProduct();
deleteMutation.mutate(productId);
```

### **Gerenciamento de Cache**

#### Invalidação de Cache

```typescript
// Marca cache como desatualizado e refaz request
queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCTS });
```

#### Atualização Manual do Cache

```typescript
// Atualiza diretamente o cache sem nova requisição
queryClient.setQueriesData({ queryKey: QUERY_KEYS.PRODUCTS }, newData);
```

#### Remoção de Cache

```typescript
// Remove dados do cache
queryClient.removeQueries({ queryKey: QUERY_KEYS.PRODUCT(id) });
```

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js 18+
- pnpm (recomendado) ou npm

### Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/felpfsf/react-query-tests.git
   cd react-query-tests
   ```

2. **Instale as dependências:**

   ```bash
   pnpm install
   ```

3. **Inicie o servidor de desenvolvimento:**

   ```bash
   pnpm dev
   ```

4. **Acesse no navegador:**

   ```bash
   http://localhost:5173
   ```

##
