const prisma = require('../database/prisma')

exports.criar = async (req, res) => {
  const { nome, descricao } = req.body

  if (!nome) {
    return res.status(400).json({ erro: 'Nome é obrigatório' })
  }

  const materia = await prisma.materia.create({
    data: { nome, descricao }
  })

  return res.status(201).json(materia)
}

exports.listar = async (req, res) => {
  const materias = await prisma.materia.findMany()
  return res.json(materias)
}

exports.buscarPorId = async (req, res) => {
  const id = Number(req.params.id)

  const materia = await prisma.materia.findUnique({
    where: { id }
  })

  if (!materia) {
    return res.status(404).json({ erro: 'Matéria não encontrada' })
  }

  return res.json(materia)
}

exports.atualizar = async (req, res) => {
  const id = Number(req.params.id)
  const { nome, descricao } = req.body

  const materiaExiste = await prisma.materia.findUnique({
    where: { id }
  })

  if (!materiaExiste) {
    return res.status(404).json({ erro: 'Matéria não encontrada' })
  }

  const materia = await prisma.materia.update({
    where: { id },
    data: { nome, descricao }
  })

  return res.json(materia)
}

exports.deletar = async (req, res) => {
  const id = Number(req.params.id)

  const materiaExiste = await prisma.materia.findUnique({
    where: { id }
  })

  if (!materiaExiste) {
    return res.status(404).json({ erro: 'Matéria não encontrada' })
  }

  await prisma.materia.delete({
    where: { id }
  })

  return res.status(200).json({
    mensagem: 'Matéria deletada com sucesso'
  })
}

exports.resumo = async (req, res) => {
  const id = Number(req.params.id)

  const materia = await prisma.materia.findUnique({
    where: { id },
    include: { tarefas: true }
  })

  if (!materia) {
    return res.status(404).json({ erro: 'Matéria não encontrada' })
  }

  return res.json({
    materia: materia.nome,
    totalTarefas: materia.tarefas.length,
    tarefas: materia.tarefas
  })
}
