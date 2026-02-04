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
  descricao TEXT,
  materia_id INT NOT NULL,
  FOREIGN KEY (materia_id) REFERENCES materias(id)
);