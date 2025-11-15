import prisma from "../prisma/client.js";

export const createCategoria = async (req, res) => {
  const categoria = await prisma.categoria.create({
    data: { nome: req.body.nome }
  });
  res.json(categoria);
};

export const getCategorias = async (req, res) => {
  const categorias = await prisma.categoria.findMany();
  res.json(categorias);
};
