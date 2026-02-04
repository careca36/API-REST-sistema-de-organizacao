const materiasRepositorio = require('../repositorio/materiasRepositorio')
const tarefasRepositorio = require('../repositorio/tarefasRepositorio')

exports.criar = async (req, res) => {
  const { nome, descricao } = req.body
  if (!nome) {
    return res.status(400).json({ erro: 'Nome é obrigatório' })
  }

  const materia = await materiasRepositorio.criar(nome, descricao)
  res.status(201).json(materia)
}

exports.listar = async (req, res) => {
  const materias = await materiasRepositorio.listar()
  res.json(materias)
}

exports.buscarPorId = async (req, res) => {
  const materia = await materiasRepositorio.buscarPorId(req.params.id)
  if (!materia) {
    return res.status(404).json({ erro: 'Matéria não encontrada' })
  }
  res.json(materia)
}

exports.atualizar = async (req, res) => {
  await materiasRepositorio.atualizar(req.params.id, req.body)
  res.json({ mensagem: 'Matéria atualizada' })
}

exports.deletar = async (req, res) => {
  await materiasRepositorio.deletar(req.params.id)
  res.json({ mensagem: 'Matéria removida' })
}

exports.resumo = async (req, res) => {
  const resumo = await tarefasRepositorio.resumoPorMateria(req.params.id)
  res.json(resumo)
}
