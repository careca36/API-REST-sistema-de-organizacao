const express = require('express')
const router = express.Router()
const bancoDeDados = require('../database/bancoDeDados')

const STATUS_VALIDOS = ['pendente', 'em_andamento', 'concluida']

// cadastrar tarefa
router.post('/', (req, res) => {
  const { titulo, status, dataEntrega, materiaId } = req.body

  if (!titulo || titulo.trim() === '') {
    return res.status(400).json({ erro: 'Título é obrigatório' })
  }

  if (!dataEntrega || isNaN(new Date(dataEntrega))) {
    return res.status(400).json({ erro: 'Data de entrega inválida' })
  }

  if (!STATUS_VALIDOS.includes(status)) {
    return res.status(400).json({ erro: 'Status inválido' })
  }

  const materiaExiste = bancoDeDados.materias.some(m => m.id === materiaId)
  if (!materiaExiste) {
    return res.status(400).json({ erro: 'Matéria não existe' })
  }

  const tarefa = {
    id: bancoDeDados.tarefaIdSequencia++,
    titulo,
    status,
    dataEntrega,
    materiaId
  }

  bancoDeDados.tarefas.push(tarefa)
  res.status(201).json(tarefa)
})

// listar tarefas
router.get('/', (req, res) => {
  res.json(bancoDeDados.tarefas)
})

// atualizar tarefa
router.put('/:id', (req, res) => {
  const id = Number(req.params.id)
  const tarefa = bancoDeDados.tarefas.find(t => t.id === id)

  if (!tarefa) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' })
  }

  const { titulo, status, dataEntrega } = req.body

  if (titulo !== undefined) {
    if (titulo.trim() === '') {
      return res.status(400).json({ erro: 'Título não pode ser vazio' })
    }
    tarefa.titulo = titulo
  }

  if (status !== undefined) {
    if (!STATUS_VALIDOS.includes(status)) {
      return res.status(400).json({ erro: 'Status inválido' })
    }
    tarefa.status = status
  }

  if (dataEntrega !== undefined) {
    if (isNaN(new Date(dataEntrega))) {
      return res.status(400).json({ erro: 'Data de entrega inválida' })
    }
    tarefa.dataEntrega = dataEntrega
  }

  res.json(tarefa)
})

// remover tarefa
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = bancoDeDados.tarefas.findIndex(t => t.id === id)

  if (index === -1) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' })
  }

  bancoDeDados.tarefas.splice(index, 1)
  res.status(204).send()
})

// tarefas atrasadas
router.get('/atrasadas', (req, res) => {
  const hoje = new Date()

  const atrasadas = bancoDeDados.tarefas.filter(t => {
    const entrega = new Date(t.dataEntrega)
    return !isNaN(entrega) && entrega < hoje && t.status !== 'concluida'
  })

  res.json(atrasadas)
})

module.exports = router
