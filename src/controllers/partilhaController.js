import prisma from "../prisma/client.js";

export const criarPartilha = async (req, res) => {
  try {
    const userId = req.user.id;
    const { animalId } = req.body;

    if (!animalId) {
      return res.status(400).json({ erro: "animalId é obrigatório" });
    }

    const partilha = await prisma.partilha.create({
      data: {
        userId,
        animalId: Number(animalId)
      },
      include: {
        animal: true,
        user: true
      }
    });

    res.status(201).json(partilha);

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao criar partilha" });
  }
};

export const listarPartilhas = async (req, res) => {
  try {
    const { animalId, userId } = req.query;

    const where = {};

    if (animalId) where.animalId = Number(animalId);
    if (userId) where.userId = Number(userId);

    const partilhas = await prisma.partilha.findMany({
      where,
      include: {
        animal: true,
        user: true
      }
    });

    res.json(partilhas);

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao listar partilhas" });
  }
};
