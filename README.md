# Projeto de Estudo: React Query com TypeScript e Vite

Este projeto foi criado para praticar e explorar o uso do React Query em conjunto com React, TypeScript e Vite. Ele serve como um ambiente de aprendizado para entender como gerenciar estados assíncronos de forma eficiente em aplicações React.

## Tecnologias Utilizadas

- **React**: Biblioteca para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática ao código.
- **Vite**: Ferramenta de build rápida e moderna para projetos web.
- **React Query**: Biblioteca para gerenciamento de estados assíncronos e cache de dados.

## Objetivo do Projeto

O objetivo principal deste projeto é:

- Praticar o uso do React Query para gerenciar chamadas assíncronas à API.
- Entender como configurar e utilizar o React Query em um projeto TypeScript.
- Explorar boas práticas para lidar com estados assíncronos em aplicações React.

## Estrutura do Projeto

A estrutura do projeto está organizada da seguinte forma:

```plaintext
public/
src/
  App.css
  App.tsx
  index.css
  main.tsx
  assets/
  config/
    api.config.ts
  hooks/
    useProductQuery.ts
  lib/
    http-client.ts
    utils.ts
  services/
    product.service.ts
  types/
    product.types.ts
```

## Como Executar o Projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/felpfsf/react-query-tests.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd react-query-tests
   ```

3. Instale as dependências:

   ```bash
   pnpm install
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   pnpm dev
   ```

5. Acesse o projeto no navegador em `http://localhost:5173`.

## Próximos Passos

- Adicionar exemplos práticos de uso do React Query.
- Implementar testes para os hooks e serviços criados.
- Explorar mais funcionalidades avançadas do React Query, como invalidation e otimizações de cache.
