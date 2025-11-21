import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import prisma from "../prisma/client.js";

const router = express.Router();




router.get("/", authMiddleware, async (req, res) => {
  try {
    const {
      estado,
      adotanteId,
      animalId,
      dataMin,
      dataMax,
      sort
    } = req.query;

    const where = {};

    
    if (estado) {
      where.estado = estado.toUpperCase();
    }

   
    if (adotanteId) {
      where.adotanteId = Number(adotanteId);
    }

    
    if (animalId) {
      where.animalId = Number(animalId);
    }

    
    if (dataMin || dataMax) {
      where.data = {};
      if (dataMin) where.data.gte = new Date(dataMin);
      if (dataMax) where.data.lte = new Date(dataMax);
    }

 
    let orderBy = undefined;
    if (sort) {
      const [campo, direcao] = sort.split("_");
      orderBy = { [campo]: direcao };
    }

    const adocoes = await prisma.adocao.findMany({
      where,
      orderBy,
      include: {
        adotante: true,
        animal: true
      }
    });

    res.json(adocoes);

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao filtrar adoções" });
  }
});



router.post("/", authMiddleware, async (req, res) => {
  try {
    const { adotanteId, animalId, notas } = req.body;

    if (!adotanteId || !animalId) {
      return res.status(400).json({ erro: "adotanteId e animalId são obrigatórios" });
    }

    const adocao = await prisma.adocao.create({
      data: {
        adotanteId: Number(adotanteId),
        animalId: Number(animalId),
        notas: notas || null
      }
    });

    res.status(201).json(adocao);

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao criar adoção" });
  }
});


// ============================================
// ATUALIZAR ADOÇÃO (estado, notas…)
// ============================================

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { estado, notas } = req.body;

    const adocao = await prisma.adocao.update({
      where: { id },
      data: {
        estado: estado?.toUpperCase(),
        notas
      }
    });

    res.json(adocao);

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao atualizar adoção" });
  }
});



router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.adocao.delete({
      where: { id }
    });

    res.json({ mensagem: "Adoção eliminada" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao eliminar adoção" });
  }
});


export default router;

