const express = require('express')
const controller = require('../controllers/materiasController')

const router = express.Router()

router.post('/', controller.criar)
router.get('/', controller.listar)
router.get('/:id/resumo', controller.resumo)
router.get('/:id', controller.buscarPorId)
router.put('/:id', controller.atualizar)
router.delete('/:id', controller.deletar)

module.exports = router
