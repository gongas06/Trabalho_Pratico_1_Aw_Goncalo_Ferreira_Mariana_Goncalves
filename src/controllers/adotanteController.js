const prisma = require('../prisma/client');
const { z } = require('zod');

const adotanteSchema = z.object({
  nome: z.string().min(2, "Nome inválido"),
  telefone: z.string().min(9, "Telefone inválido"),
  email: z.string().email("Email inválido")
});

// Criar adotante
exports.criar = async (req, res, next) => {
  try {
    adotanteSchema.parse(req.body);

    const adotante = await prisma.adotante.create({
      data: req.body,
    });

    res.status(201).json({ success: true, data: adotante });
  } catch (err) {
    next(err);
  }
};

// Listar todos
exports.listar = async (req, res, next) => {
  try {
    const adotantes = await prisma.adotante.findMany();
    res.json({ success: true, data: adotantes });
  } catch (err) {
    next(err);
  }
};

// Buscar por ID
exports.buscar = async (req, res, next) => {
  try {
    const adotante = await prisma.adotante.findUnique({
      where: { id: Number(req.params.id) }
    });

    if (!adotante) {
      return res.status(404).json({ success: false, error: "Não encontrado" });
    }

    res.json({ success: true, data: adotante });
  } catch (err) {
    next(err);
  }
};

// Atualizar
exports.atualizar = async (req, res, next) => {
  try {
    const adotante = await prisma.adotante.update({
      where: { id: Number(req.params.id) },
      data: req.body
    });

    res.json({ success: true, data: adotante });
  } catch (err) {
    next(err);
  }
};

// Apagar
exports.apagar = async (req, res, next) => {
  try {
    await prisma.adotante.delete({
      where: { id: Number(req.params.id) }
    });
    res.json({ success: true, message: "Removido com sucesso" });
  } catch (err) {
    next(err);
  }
};
