import prisma from "../prisma/client.js";

export const partilharAnimal = async (req, res) => {
  const { id, userId } = req.params;

  const partilha = await prisma.partilha.create({
    data: {
      animalId: Number(id),
      userId: Number(userId)
    }
  });

  res.json(partilha);
};
