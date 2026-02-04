const express = require('express')
const router = express.Router()
const materiasController = require('../controllers/materiasController')

router.post('/', materiasController.criar)
router.get('/', materiasController.listar)
router.get('/:id', materiasController.buscarPorId)
router.put('/:id', materiasController.atualizar)
router.delete('/:id', materiasController.deletar)

// resumo por matéria
router.get('/:id/resumo', materiasController.resumo)

module.exports = router
