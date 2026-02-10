const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  async criar(req, res) {
    try {
      const { nome, descricao } = req.body;

      if (!nome) {
        return res.status(400).json({ error: "Nome da matéria é obrigatório" });
      }

      const materia = await prisma.materia.create({
        data: { nome, descricao },
      });

      return res.status(201).json(materia);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao criar matéria" });
    }
  },

  async listar(req, res) {
    try {
      const materias = await prisma.materia.findMany({
        include: { tarefas: true },
      });
      return res.json(materias);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao listar matérias" });
    }
  },

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;

      const materia = await prisma.materia.findUnique({
        where: { id: Number(id) },
        include: { tarefas: true },
      });

      if (!materia) {
        return res.status(404).json({ error: "Matéria não encontrada" });
      }

      return res.json(materia);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar matéria" });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, descricao } = req.body;

      const materiaExiste = await prisma.materia.findUnique({
        where: { id: Number(id) },
      });

      if (!materiaExiste) {
        return res.status(404).json({ error: "Matéria não encontrada" });
      }

      const materiaAtualizada = await prisma.materia.update({
        where: { id: Number(id) },
        data: { nome, descricao },
      });

      return res.json({
        message: "Matéria atualizada com sucesso",
        data: materiaAtualizada,
      });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar matéria" });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;

      await prisma.materia.delete({
        where: { id: Number(id) },
      });

      return res.json({
        message: "Matéria deletada com sucesso",
      });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao deletar matéria" });
    }
  },

  async resumo(req, res) {
    try {
      const materias = await prisma.materia.findMany({
        include: { tarefas: true },
      });

      const resumo = materias.map((m) => {
        const total = m.tarefas.length;
        const concluidas = m.tarefas.filter(
          (t) => t.status === "concluida"
        ).length;

        return {
          materia: m.nome,
          total,
          concluidas,
          pendentes: total - concluidas,
        };
      });

      return res.json(resumo);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao gerar resumo" });
    }
  },
};
