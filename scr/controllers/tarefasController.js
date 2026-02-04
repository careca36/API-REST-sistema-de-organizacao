const tarefasRepositorio = require('../repositorio/tarefasRepositorio')
const materiasRepositorio = require('../repositorio/materiasRepositorio')

exports.criar = async (req, res) => {
  const { titulo, descricao, status, materia_id, data_entrega } = req.body

  const materia = await materiasRepositorio.buscarPorId(materia_id)
  if (!materia) {
    return res.status(400).json({ erro: 'Matéria não existe' })
  }

  const tarefa = await tarefasRepositorio.criar(
    titulo,
    descricao,
    status,
    materia_id,
    data_entrega
  )

  res.status(201).json(tarefa)
}

exports.listar = async (req, res) => {
  res.json(await tarefasRepositorio.listar())
}

exports.buscarPorId = async (req, res) => {
  const tarefa = await tarefasRepositorio.buscarPorId(req.params.id)
  if (!tarefa) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' })
  }
  res.json(tarefa)
}

exports.atualizar = async (req, res) => {
  await tarefasRepositorio.atualizar(req.params.id, req.body)
  res.json({ mensagem: 'Tarefa atualizada' })
}

exports.deletar = async (req, res) => {
  await tarefasRepositorio.deletar(req.params.id)
  res.json({ mensagem: 'Tarefa removida' })
}

exports.atrasadas = async (req, res) => {
  res.json(await tarefasRepositorio.atrasadas())
}
