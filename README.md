# Desafio Técnico Vitor -- API REST (Sistema de Organização)

Projeto backend desenvolvido utilizando Node.js e Express, com banco de dados PostgreSQL, seguindo o padrão API REST.
A aplicação permite o gerenciamento de matérias e tarefas, incluindo CRUD completo, resumo por matéria e listagem de tarefas atrasadas.

------------------------------------------------------------------------

## Tecnologias Utilizadas

-   Node.js (v18)
-   Express
-   JavaScript
-   PostgreSQL 
-   Prisma ORM 
-   Docker
-   Docker compose
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
## PRÉ REQUISITOS:
- docker
-docker compose
docker --version
docker compose version

 ## Requisitos Técnicos do projeto:
  # Entidades:
  -materia
  -tarefa
  -uma tarefa pode ter multiplas tarefas
  
  ## Regras do Negócio:
- Nome e status da matéria Obrigatório.
- Status da tarefa deve ser válido: em_andamento, pendente, concluida
-materiaID deve existir ao criar uma tarefa
- tarefa atrasada deve ser um endpoint extra

## Como Executar o Projeto:

# -1 Clonar o repositório:
git clone ...
cd API-REST-sistema-de-organizacao

# -2 Configurar o .env:
DATABASE_URL="postgresql://postgres:12345678@db:5432/organizacao"
PORT=3000

# -3 Subir os containers :
docker compose up --build

# Após isso a API ficara disponível em http://localhost:3000 

# END POINTS DISPONÍVEIS:
# Materias:
-POST /materias
-GET /materias
-GET /materias/:id
-GET /materias/:id/resumo
-PUT /materias/:id
-DELETE /materias/:id

EXEMPLO DE COMO CRIAR MATÉRIA
-> {
    "nome": "nome da materia",
    "descricao": "teste" 
}

# Tarefas:
-POST /tarefas
-GET /tarefas
-GET /tarefas/:id
-GET tarefas/atrasadas
-PUT /tarefas/:id
-DELETE /tarefas/:id

EXEMPLO DE COMO CRIAR TAREFAS
->  {
  "titulo": "Lista 1",
  "descricao": "Exercícios",
  "dataEntrega": "2026-02-20",
  "status": "pendente",
  "materiaId": 1
}