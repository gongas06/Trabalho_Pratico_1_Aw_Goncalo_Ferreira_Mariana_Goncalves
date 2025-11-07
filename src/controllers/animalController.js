const prisma = require('../prisma/client');
const { z } = require('zod');

const animalSchema = z.object({
  nome: z.string().min(2),
  especie: z.string().min(2),
  idade: z.number().int().nonnegative(),
});

// Criar
exports.criar = async (req, res, next) => {
  try {
    animalSchema.parse(req.body);

    const animal = await prisma.animal.create({
      data: req.body,
    });

    res.status(201).json({ success: true, data: animal });
  } catch (err) {
    next(err);
  }
};

// Listar
exports.listar = async (req, res, next) => {
  try {
    const animais = await prisma.animal.findMany();
    res.json({ success: true, data: animais });
  } catch (err) {
    next(err);
  }
};

// Buscar por ID
exports.buscar = async (req, res, next) => {
  try {
    const animal = await prisma.animal.findUnique({
      where: { id: Number(req.params.id) }
    });

    if (!animal) {
      return res.status(404).json({ success: false, error: "Não encontrado" });
    }

    res.json({ success: true, data: animal });
  } catch (err) {
    next(err);
  }
};

// Atualizar
exports.atualizar = async (req, res, next) => {
  try {
    const animal = await prisma.animal.update({
      where: { id: Number(req.params.id) },
      data: req.body
    });

    res.json({ success: true, data: animal });
  } catch (err) {
    next(err);
  }
};

// Apagar
exports.apagar = async (req, res, next) => {
  try {
    await prisma.animal.delete({
      where: { id: Number(req.params.id) }
    });
    res.json({ success: true, message: "Removido com sucesso" });
  } catch (err) {
    next(err);
  }
};
