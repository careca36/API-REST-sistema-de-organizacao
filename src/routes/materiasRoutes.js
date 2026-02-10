const express = require("express");
const controller = require("../controllers/materiasController");

const router = express.Router();

router.post("/materias", controller.criar);
router.get("/materias", controller.listar);
router.get("/materias/resumo", controller.resumo);
router.get("/materias/:id", controller.buscarPorId);
router.put("/materias/:id", controller.atualizar);
router.delete("/materias/:id", controller.deletar);

module.exports = router;
