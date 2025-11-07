const prisma = require('../prisma/client');
const { z } = require('zod');

const adocaoSchema = z.object({
  adotanteId: z.number().int(),
  animalId: z.number().int(),
  dataAdocao: z.string().datetime().optional(),
});

// Criar
exports.criar = async (req, res, next) => {
  try {
    adocaoSchema.parse(req.body);

    const adocao = await prisma.adocao.create({
      data: req.body,
    });

    res.status(201).json({ success: true, data: adocao });
  } catch (err) {
    next(err);
  }
};

// Listar todas
exports.listar = async (req, res, next) => {
  try {
    const adocoes = await prisma.adocao.findMany({
      include: { adotante: true, animal: true }
    });

    res.json({ success: true, data: adocoes });
  } catch (err) {
    next(err);
  }
};

// Buscar por ID
exports.buscar = async (req, res, next) => {
  try {
    const adocao = await prisma.adocao.findUnique({
      where: { id: Number(req.params.id) },
      include: { adotante: true, animal: true }
    });

    if (!adocao) {
      return res.status(404).json({ success: false, error: "Não encontrada" });
    }

    res.json({ success: true, data: adocao });
  } catch (err) {
    next(err);
  }
};

// Apagar
exports.apagar = async (req, res, next) => {
  try {
    await prisma.adocao.delete({
      where: { id: Number(req.params.id) }
    });

    res.json({ success: true, message: "Adoção removida" });
  } catch (err) {
    next(err);
  }
};
