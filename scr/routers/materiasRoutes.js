const express = require('express')
const router = express.Router()
const bancoDeDados = require('../database/bancoDeDados')

// cadastrar matéria
router.post('/', async (req, res) => {
  const { titulo, status, dataEntrega, materiaId } = req.body

  if (!titulo || titulo.trim() === '') {
    return res.status(400).json({ erro: 'Título é obrigatório' })
  }

  if (!STATUS_VALIDOS.includes(status)) {
    return res.status(400).json({ erro: 'Status inválido' })
  }

  try {
    const tarefa = await repo.criar({
      titulo,
      status,
      dataEntrega,
      materiaId
    })

    res.status(201).json(tarefa)
  } catch (erro) {
    res.status(500).json({ erro: erro.message })
  }
})
// listar matérias
router.get('/', (req, res) => {
  res.json(bancoDeDados.materias)
})

// atualizar matéria
router.put('/:id', (req, res) => {
  const id = Number(req.params.id)
  const materia = bancoDeDados.materias.find(m => m.id === id)

  if (!materia) {
    return res.status(404).json({ erro: 'Matéria não encontrada' })
  }

  if (req.body.nome !== undefined && req.body.nome.trim() === '') {
    return res.status(400).json({ erro: 'Nome não pode ser vazio' })
  }

  materia.nome = req.body.nome ?? materia.nome
  res.json(materia)
})

// remover matéria
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = bancoDeDados.materias.findIndex(m => m.id === id)

  if (index === -1) {
    return res.status(404).json({ erro: 'Matéria não encontrada' })
  }

  bancoDeDados.materias.splice(index, 1)
  res.status(204).send()
})

// resumo da matéria
router.get('/:id/resumo', (req, res) => {
  const materiaId = Number(req.params.id)

  const tarefas = bancoDeDados.tarefas.filter(
    tarefa => tarefa.materiaId === materiaId
  )

  const concluidas = tarefas.filter(t => t.status === 'Concluida').length

  res.json({
    total: tarefas.length,
    concluidas,
    pendentes: tarefas.length - concluidas
  })
})

module.exports = router
