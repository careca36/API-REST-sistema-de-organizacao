const express = require('express')
const controller = require('../controllers/tarefasController')

const router = express.Router()

router.post('/', controller.criar)
router.get('/', controller.listar)
router.get('/atrasadas', controller.atrasadas)
router.put('/:id', controller.atualizar)
router.delete('/:id', controller.deletar)

module.exports = router
