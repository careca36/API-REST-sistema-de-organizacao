const repo = require('../repositorio/tarefasRepositorio')

// CREATE
async function criar(req, res) {
  const { titulo, descricao } = req.body

  if (!titulo || !descricao) {
    return res.status(400).json({
      erro: 'titulo e descricao são obrigatórios'
    })
  }

  try {
    const tarefa = await repo.criarTarefa(titulo, descricao)
    res.status(201).json(tarefa)
  } catch (err) {
    console.error('ERRO MYSQL 👉', err)
    res.status(500).json({ erro: 'Erro ao criar tarefa' })
  }
}

// READ
async function listar(req, res) {
  try {
    const tarefas = await repo.listarTarefas()
    res.json(tarefas)
  } catch (err) {
    console.error(err)
    res.status(500).json({ erro: 'Erro ao listar tarefas' })
  }
}

// UPDATE
async function atualizar(req, res) {
  const { id } = req.params
  const { titulo, descricao } = req.body

  if (!titulo || !descricao) {
    return res.status(400).json({
      erro: 'titulo e descricao são obrigatórios'
    })
  }

  try {
    const atualizado = await repo.atualizarTarefa(id, titulo, descricao)

    if (!atualizado) {
      return res.status(404).json({
        erro: 'Tarefa não encontrada'
      })
    }

    res.json({ mensagem: 'Tarefa atualizada com sucesso' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ erro: 'Erro ao atualizar tarefa' })
  }
}

// DELETE
async function deletar(req, res) {
  const { id } = req.params

  try {
    const deletado = await repo.deletarTarefa(id)

    if (!deletado) {
      return res.status(404).json({
        erro: 'Tarefa não encontrada'
      })
    }

    res.json({ mensagem: 'Tarefa deletada com sucesso' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ erro: 'Erro ao deletar tarefa' })
  }
}

module.exports = {
  criar,
  listar,
  atualizar,
  deletar
}
