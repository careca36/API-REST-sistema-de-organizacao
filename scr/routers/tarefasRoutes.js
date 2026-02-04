const express = require('express')
const router = express.Router()
const tarefasController = require('../controllers/tarefasController')

router.post('/', tarefasController.criar)
router.get('/', tarefasController.listar)
router.get('/:id', tarefasController.buscarPorId)
router.put('/:id', tarefasController.atualizar)
router.delete('/:id', tarefasController.deletar)

// tarefas atrasadas
router.get('/status/atrasadas', tarefasController.atrasadas)

module.exports = router
