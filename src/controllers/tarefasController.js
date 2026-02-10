const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const statusValidos = ["pendente", "em_andamento", "concluida"];

module.exports = {
  async criar(req, res) {
    try {
      const { titulo, status, dataEntrega, materiaId } = req.body;

      if (!statusValidos.includes(status)) {
        return res.status(400).json({ error: "Status inválido" });
      }

      const materiaExiste = await prisma.materia.findUnique({
        where: { id: Number(materiaId) },
      });

      if (!materiaExiste) {
        return res.status(400).json({ error: "materiaId não existe" });
      }

      const tarefa = await prisma.tarefa.create({
        data: {
          titulo,
          status,
          dataEntrega: new Date(dataEntrega),
          materiaId: Number(materiaId),
        },
      });

      return res.status(201).json(tarefa);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao criar tarefa" });
    }
  },

  async listar(req, res) {
    try {
      const tarefas = await prisma.tarefa.findMany({
        include: { materia: true },
      });
      return res.json(tarefas);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao listar tarefas" });
    }
  },

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;

      const tarefa = await prisma.tarefa.findUnique({
        where: { id: Number(id) },
      });

      if (!tarefa) {
        return res.status(404).json({ error: "Tarefa não encontrada" });
      }

      return res.json(tarefa);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar tarefa" });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { titulo, status, dataEntrega } = req.body;

      if (status && !statusValidos.includes(status)) {
        return res.status(400).json({ error: "Status inválido" });
      }

      const tarefaAtualizada = await prisma.tarefa.update({
        where: { id: Number(id) },
        data: {
          titulo,
          status,
          dataEntrega: dataEntrega ? new Date(dataEntrega) : undefined,
        },
      });

      return res.json({
        message: "Tarefa atualizada com sucesso",
        data: tarefaAtualizada,
      });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar tarefa" });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;

      await prisma.tarefa.delete({
        where: { id: Number(id) },
      });

      return res.json({
        message: "Tarefa deletada com sucesso",
      });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao deletar tarefa" });
    }
  },

  async atrasadas(req, res) {
    try {
      const tarefas = await prisma.tarefa.findMany({
        where: {
          dataEntrega: { lt: new Date() },
          status: { not: "concluida" },
        },
      });

      return res.json(tarefas);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar tarefas atrasadas" });
    }
  },
};
