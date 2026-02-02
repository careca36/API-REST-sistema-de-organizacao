const router = require('express').Router()
const controller = require('../controllers/tarefasController')

router.post('/', controller.criar)
router.get('/', controller.listar)
router.put('/:id', controller.atualizar)
router.delete('/:id', controller.deletar)

module.exports = router
