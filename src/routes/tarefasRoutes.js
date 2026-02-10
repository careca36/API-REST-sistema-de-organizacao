const express = require("express");
const controller = require("../controllers/tarefasController");

const router = express.Router();

router.post("/tarefas", controller.criar);
router.get("/tarefas", controller.listar);
router.get("/tarefas/atrasadas", controller.atrasadas);
router.get("/tarefas/:id", controller.buscarPorId);
router.put("/tarefas/:id", controller.atualizar);
router.delete("/tarefas/:id", controller.deletar);

module.exports = router;
