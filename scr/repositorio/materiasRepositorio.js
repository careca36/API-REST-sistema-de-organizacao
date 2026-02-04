const connection = require('../database/connection')

exports.criar = async (nome, descricao) => {
  const [result] = await connection.query(
    'INSERT INTO materias (nome, descricao) VALUES (?, ?)',
    [nome, descricao]
  )
  return { id: result.insertId, nome, descricao }
}

exports.listar = async () => {
  const [rows] = await connection.query('SELECT * FROM materias')
  return rows
}

exports.buscarPorId = async (id) => {
  const [rows] = await connection.query(
    'SELECT * FROM materias WHERE id = ?',
    [id]
  )
  return rows[0]
}

exports.atualizar = async (id, dados) => {
  await connection.query(
    'UPDATE materias SET nome = ?, descricao = ? WHERE id = ?',
    [dados.nome, dados.descricao, id]
  )
}

exports.deletar = async (id) => {
  await connection.query('DELETE FROM materias WHERE id = ?', [id])
}
