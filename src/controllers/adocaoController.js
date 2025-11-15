import prisma from "../prisma/client.js";

export const createAdocao = async (req, res) => {
  const { adotanteId, animalId, notas } = req.body;

  const adocao = await prisma.adocao.create({
    data: {
      adotanteId: Number(adotanteId),
      animalId: Number(animalId),
      notas,
      estado: "PENDENTE"
    }
  });

  res.json(adocao);
};

export const updateEstado = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  const updated = await prisma.adocao.update({
    where: { id: Number(id) },
    data: { estado }
  });

  res.json(updated);
};
