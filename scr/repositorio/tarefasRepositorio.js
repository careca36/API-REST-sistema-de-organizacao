const connection = require('../database/connection')

exports.criar = async (titulo, descricao, status, materia_id, data_entrega) => {
  const [result] = await connection.query(
    `INSERT INTO tarefas 
     (titulo, descricao, status, materia_id, data_entrega)
     VALUES (?, ?, ?, ?, ?)`,
    [titulo, descricao, status, materia_id, data_entrega]
  )

  return { id: result.insertId, titulo, descricao, status, materia_id }
}

exports.listar = async () => {
  const [rows] = await connection.query('SELECT * FROM tarefas')
  return rows
}

exports.buscarPorId = async (id) => {
  const [rows] = await connection.query(
    'SELECT * FROM tarefas WHERE id = ?',
    [id]
  )
  return rows[0]
}

exports.atualizar = async (id, dados) => {
  await connection.query(
    'UPDATE tarefas SET titulo=?, descricao=?, status=? WHERE id=?',
    [dados.titulo, dados.descricao, dados.status, id]
  )
}

exports.deletar = async (id) => {
  await connection.query('DELETE FROM tarefas WHERE id = ?', [id])
}

exports.atrasadas = async () => {
  const [rows] = await connection.query(`
    SELECT * FROM tarefas
    WHERE data_entrega < CURDATE()
    AND status != 'concluida'
  `)
  return rows
}

exports.resumoPorMateria = async (materiaId) => {
  const [rows] = await connection.query(`
    SELECT status, COUNT(*) as total
    FROM tarefas
    WHERE materia_id = ?
    GROUP BY status
  `, [materiaId])

  return rows
}
