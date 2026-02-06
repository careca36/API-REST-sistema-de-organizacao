* Desafio Técnico Vitor - API-REST

projeto backend desenvolvido usando Node.js e Express com banco de dados local, em memória

----------------------------------------------------------------------------------------------------------------------------------------------------------
# Tecnologias Usadas:
-Node.js
-Express
-JavaScript
-MySQL
-mysql2
-dotenv
-Nodemon (desenvolvimento)
-Postman (testes da API)
-Git / GitHu
----------------------------------------------------------------------------------------------------------------------------------------------------------
# Estrutura do Projeto(Recomendada):
scr/
│
├── app.js
├── server.js
│
├── routers/
│   ├── materiasRoutes.js
│   └── tarefasRoutes.js
│
├── controllers/
│   ├── materiasController.js
│   └── tarefasController.js
│
├── repositorio/
│   ├── materiasRepositorio.js
│   └── tarefasRepositorio.js
│
├── database/
│   └── connection.js
----------------------------------------------------------------------------------------------------------------------------------------------------------
# Como executar o projeto:

-1: instalar as depedencias: node, nodemon(dev), express, MYSQL // npm install

# -2 Criar banco de dados em tabela:
CREATE DATABASE organizacao;
USE organizacao;

CREATE TABLE materias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT NOT NULL
);

CREATE TABLE tarefas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  descricao TEXT NOT NULL,
  status ENUM('pendente', 'em_andamento', 'concluida') NOT NULL,
  data_entrega DATE,
  materia_id INT NOT NULL,
  FOREIGN KEY (materia_id) REFERENCES materias(id)
    ON DELETE CASCADE
);

-2: iniciar o server com: node ./scr/server.js ou npm run dev(dev) -> servidor ficara disponivel na url http://localhost:3000
-3: no postman será possivel testar os endpoints:


# MATERIAS
Creat  :  POST /materias -> criar matéria
Read   :  GET /materias -> listar matérias  ||  GET /materias/:id Busca matéria por id  || GET /materias/:id/resumo -> resumo das tarefas daquela tarefa
Update :  PUT /materias/:id -> atualiza a matéria 
Delete :  DELETE /materias/:id -> remove a matéria atribuída aquele id

# TAREFAS
Creat : POST /tarefas -> cadastrar uma tarefa em uma materia
Read:   GET /tarefas -> lista todas tarefas cadastradas
Update: PUT/tarefas/:id -> atualiza uma tarefa pelo id na url
Delete: DELETE/tarefas/:id -> deleta tarefa pelo id na url

ATRASADAS! GET/tarefas/atrasadas -> lista as tarefas com data de entrega vencida ou status não concluido
# API-REST-sistema-de-organizacao