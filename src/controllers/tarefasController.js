const prisma = require('../database/prisma')

exports.criar = async (req, res) => {
  const { titulo, descricao, dataEntrega, materiaId, status } = req.body

  if (!titulo || !materiaId || !dataEntrega) {
    return res.status(400).json({
      erro: 'titulo, dataEntrega e materiaId são obrigatórios'
    })
  }

  const tarefa = await prisma.tarefa.create({
    data: {
      titulo,
      descricao,
      dataEntrega: new Date(dataEntrega),
      status: status ?? false,
      materiaId
    }
  })

  return res.status(201).json(tarefa)
}

exports.listar = async (req, res) => {
  const tarefas = await prisma.tarefa.findMany({
    include: { materia: true }
  })

  return res.json(tarefas)
}

exports.atualizar = async (req, res) => {
  const id = Number(req.params.id)
  const { titulo, descricao, dataEntrega, status } = req.body

  const tarefaExiste = await prisma.tarefa.findUnique({
    where: { id }
  })

  if (!tarefaExiste) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' })
  }

  const tarefa = await prisma.tarefa.update({
    where: { id },
    data: {
      titulo,
      descricao,
      status,
      dataEntrega: dataEntrega ? new Date(dataEntrega) : undefined
    }
  })

  return res.json(tarefa)
}

exports.deletar = async (req, res) => {
  const id = Number(req.params.id)

  const tarefaExiste = await prisma.tarefa.findUnique({
    where: { id }
  })

  if (!tarefaExiste) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' })
  }

  await prisma.tarefa.delete({
    where: { id }
  })

  return res.status(200).json({
    mensagem: 'Tarefa deletada com sucesso'
  })
}

exports.atrasadas = async (req, res) => {
  const hoje = new Date()

  const tarefas = await prisma.tarefa.findMany({
    where: {
      OR: [
        { dataEntrega: { lt: hoje } },
        { status: false }
      ]
    }
  })

  return res.json(tarefas)
}
