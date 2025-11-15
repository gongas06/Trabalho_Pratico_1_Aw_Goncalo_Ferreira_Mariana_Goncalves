import prisma from "../prisma/client.js";

export const createAdotante = async (req, res) => {
  const { nome, telefone, email } = req.body;

  const adotante = await prisma.adotante.create({
    data: { nome, telefone, email }
  });

  res.json(adotante);
};

export const getAdotantes = async (req, res) => {
  const adotantes = await prisma.adotante.findMany();
  res.json(adotantes);
};

