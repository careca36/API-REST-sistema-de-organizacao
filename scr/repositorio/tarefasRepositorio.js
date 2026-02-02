const pool = require('../database/connection')

function criarTarefa(titulo, descricao) {
  return pool
    .execute(
      'INSERT INTO tarefas (titulo, descricao) VALUES (?, ?)',
      [titulo, descricao]
    )
    .then(([result]) => ({
      id: result.insertId,
      titulo,
      descricao
    }))
}

function listarTarefas() {
  return pool
    .execute('SELECT * FROM tarefas')
    .then(([rows]) => rows)
}

function atualizarTarefa(id, titulo, descricao) {
  return pool
    .execute(
      'UPDATE tarefas SET titulo = ?, descricao = ? WHERE id = ?',
      [titulo, descricao, id]
    )
    .then(([result]) => result.affectedRows)
}

function deletarTarefa(id) {
  return pool
    .execute('DELETE FROM tarefas WHERE id = ?', [id])
    .then(([result]) => result.affectedRows)
}

module.exports = {
  criarTarefa,
  listarTarefas,
  atualizarTarefa,
  deletarTarefa
}
