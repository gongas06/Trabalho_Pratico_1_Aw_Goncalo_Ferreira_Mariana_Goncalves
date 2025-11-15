import prisma from "../prisma/client.js";

export const getAnimais = async (req, res) => {
  const { especie, categoria, favorito } = req.query;

  const animais = await prisma.animal.findMany({
    where: {
      especie: especie || undefined,
      categoria: categoria ? { nome: categoria } : undefined,
      favorito: favorito === "true" ? true : undefined,
    },
    include: { categoria: true }
  });

  res.json(animais);
};

export const createAnimal = async (req, res) => {
  const { nome, especie, idade, descricao, categoriaId } = req.body;

  const animal = await prisma.animal.create({
    data: { nome, especie, idade: Number(idade), descricao, categoriaId }
  });

  res.json(animal);
};

export const toggleFavorito = async (req, res) => {
  const { id } = req.params;

  const animal = await prisma.animal.findUnique({ where: { id: Number(id) } });

  const updated = await prisma.animal.update({
    where: { id: Number(id) },
    data: { favorito: !animal.favorito },
  });

  res.json(updated);
};

