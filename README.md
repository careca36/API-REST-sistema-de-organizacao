# Desafio Técnico Vitor -- API REST (Sistema de Organização)

Projeto backend desenvolvido utilizando Node.js e Express, com banco de
dados PostgreSQL, seguindo o padrão API REST.\
A aplicação permite o gerenciamento de matérias e tarefas, incluindo
CRUD completo, resumo por matéria e listagem de tarefas atrasadas.

------------------------------------------------------------------------

## Tecnologias Utilizadas

-   Node.js (v18)
-   Express
-   JavaScript
-   PostgreSQL 
-   Prisma ORM 
-   Dotenv
-   Nodemon
-   Postman
-   Git / GitHub

------------------------------------------------------------------------

## Estrutura do Projeto

    .
    ├── prisma
    │   └── schema.prisma
    ├── src
    │   ├── app.js
    │   ├── server.js
    │   ├── routes
    │   │   ├── materiasRoutes.js
    │   │   └── tarefasRoutes.js
    │   ├── controllers
    │   │   ├── materiasController.js
    │   │   └── tarefaController.js
    │   └── database
    │       └── prisma.js
    ├── .env
    ├── package.json
    └── README.md

------------------------------------------------------------------------

## Como Executar o Projeto

### 1. Instalar dependências

    npm install

### 2. Configurar banco de dados

Criar banco PostgreSQL:

    CREATE DATABASE organizacao;

Arquivo `.env`:

    DATABASE_URL="postgresql://usuario:12345678@localhost:5432/organizacao"
    PORT=3000

### 3. Prisma

    npx prisma generate
    npx prisma migrate dev --name init

### 4. Executar servidor

    npm run dev

Servidor disponível em `http://localhost:3000`

------------------------------------------------------------------------

## Endpoints

### Matérias

-   POST /materias
-   GET /materias
-   GET /materias/:id
-   GET /materias/:id/resumo
-   PUT /materias/:id
-   DELETE /materias/:id

### Tarefas

-   POST /tarefas
-   GET /tarefas
-   PUT /tarefas/:id
-   DELETE /tarefas/:id
-   GET /tarefas/atrasadas

------------------------------------------------------------------------

