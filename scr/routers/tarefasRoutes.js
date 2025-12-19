const express = require('express')
const router = express.Router()
const bancoDeDados = require('../database/bancoDeDados')

const STATUS_VALIDOS = ['pendente', 'em_andamento', 'concluida']

//CREAT, cadastrar tarefa endpoint -> /tarefas
router.post('/', (req, res) => {
  const { titulo, status, dataEntrega, materiaId } = req.body

  if (!STATUS_VALIDOS.includes(status)) {
    return res.status(400).json({ erro: 'Status inválido' })
  }

  const materiaExiste = bancoDeDados.materias.some(m => m.id === materiaId)
  if (!materiaExiste) {
    return res.status(400).json({ erro: 'Materia não existe' })
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

//READ, listar endpoint -> /tarefas
router.get('/', (req, res) => {
  res.json(bancoDeDados.tarefas)
})

//UPDATE, atualizar endpoint -> /tarefas/:id
router.put('/:id', (req, res) => {
  const id = Number(req.params.id)
  const tarefa = bancoDeDados.tarefas.find(t => t.id === id)

  if (!tarefa) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' })
  }

  const { titulo, status, dataEntrega } = req.body

  if (titulo) tarefa.titulo = titulo
  if (status) tarefa.status = status
  if (dataEntrega) tarefa.dataEntrega = dataEntrega

  res.json(tarefa)
})

//DELETE, remover endpoint -> /tarefas/:id
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = bancoDeDados.tarefas.findIndex(t => t.id === id)

  if (index === -1) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' })
  }

  const removida = bancoDeDados.tarefas[index]
  bancoDeDados.tarefas.splice(index, 1)

  res.json(removida)
})

//Tarefas Atrasadas 
router.get('/atrasadas', (req, res) => {
  const hoje = new Date()

  const atrasadas = bancoDeDados.tarefas.filter(t =>
    new Date(t.dataEntrega) < hoje && t.status !== 'concluida'
  )

  res.json(atrasadas)
})

module.exports = router