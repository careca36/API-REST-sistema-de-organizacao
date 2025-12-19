const express = require('express')
const router = express.Router()
const bancoDeDados = require('../database/bancoDeDados')
const { route } = require('../app')

// CRUD , CREATE -> Cadastrar materias - endpoint -> /materias
router.post('/', (req, res) => {
    const {nome} = req.body
    if(!nome) {
        return res.status(400).json({ erro: 'Nome da matéria É OBRIGATÓRIO!'})
    }


    const materia ={
        id: bancoDeDados.materiaIdSequencia++,
        nome
    }


    bancoDeDados.materias.push(materia)
    res.status(201).json(materia)
})

//READ listar, endpoints -> /materias ou /materias/:id
router.get('/',(req, res) => {
    res.json(bancoDeDados.materias)
})

//UPDATE atualizar, endpoints -> /materias/:id
router.put('/:id', (req, res) =>{
    const materia = bancoDeDados.materias.find(materia => materia.id == req.params.id)
    if(!materia) {
        return res.status(404).json({erro: 'Matéria não encontrada!'})
    }

    materia.nome = req.body.nome ?? materia.nome
    res.json(materia)
})

//DELETE remover, endpoint -> /materias/:id 
router.delete('/:id', (req, res) =>{
    const index = bancoDeDados.materias.findIndex(materia => materia.id == req.params.id)
    
    if(index === -1){
        return res.status(404).json({erro: 'Matéria não encontrada!'})
    }

    bancoDeDados.materias.splice(index, 1)
    res.status(204).send()
})
/**
 * para aparecer a materia deletada tem q criar uma nova const pegar o indice dela
 */


//RESUMO
router.get('/:id/resumo', (req, res) =>{
    const materiaId = Number(req.params.id)
    const tarefas = bancoDeDados.tarefas.filter(tarefa => tarefa.materiaId === materiaId)
    const resumo = {
        total: tarefas.length,
        concluidas: tarefas.filter(tarefa => tarefa.status === 'Concluida').length,
        pendentes: tarefas.filter(tarefa => tarefa.status !== 'Concluida').length
    }
    res.json(resumo)
})



module.exports = router