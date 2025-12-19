const express = require('express')
const router = express.Router()
const bancoDeDados = require('../database/bancoDeDados')

// cadastrar matéria
router.post('/', (req, res) => {
  const { nome } = req.body

  if (!nome) {
    return res.status(400).json({ erro: 'Nome da matéria é obrigatório' })
  }

  const novaMateria = {
    id: bancoDeDados.materiaIdSequencia++,
    nome
  }

  bancoDeDados.materias.push(novaMateria)
  res.status(201).json(novaMateria)
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
