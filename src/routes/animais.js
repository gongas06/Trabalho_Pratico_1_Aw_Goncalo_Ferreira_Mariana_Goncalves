import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import prisma from "../prisma/client.js";
import upload from "../middleware/upload.js";

import {
  createAnimal
} from "../controllers/animalController.js";

import {
  toggleFavorito,
  getFavoritos
} from "../controllers/favoritoController.js";

const router = express.Router();


// ============================================
// ROTAS DE FAVORITOS (DEVEM VIR PRIMEIRO)
// ============================================

router.get("/favoritos", authMiddleware, getFavoritos);

router.put("/:id/favorito", authMiddleware, toggleFavorito);


// ============================================
// UPLOAD DE FOTO DO ANIMAL
// ============================================

router.post(
  "/:id/foto",
  authMiddleware,
  upload.single("foto"),
  async (req, res) => {
    try {
      const animalId = Number(req.params.id);

      if (!req.file) {
        return res.status(400).json({ erro: "Nenhuma imagem enviada" });
      }

      const fotoPath = req.file.filename;

      const animal = await prisma.animal.update({
        where: { id: animalId },
        data: { foto: fotoPath }
      });

      res.json({
        mensagem: "Foto carregada com sucesso!",
        animal
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao fazer upload da foto" });
    }
  }
);


// ============================================
// GET /animais — PESQUISA AVANÇADA
// ============================================

router.get("/", authMiddleware, async (req, res) => {
  try {
    const {
      search,
      categoria,
      idadeMin,
      idadeMax,
      favorito,
      sort
    } = req.query;

    const where = {};

    // SEARCH
    if (search) {
      where.OR = [
        { nome: { contains: search, mode: "insensitive" } },
        { descricao: { contains: search, mode: "insensitive" } }
      ];
    }

    // Categoria
    if (categoria) {
      where.categoriaId = Number(categoria);
    }

    // Idade mínima
    if (idadeMin) {
      where.idade = { ...where.idade, gte: Number(idadeMin) };
    }

    // Idade máxima
    if (idadeMax) {
      where.idade = { ...where.idade, lte: Number(idadeMax) };
    }

    // Favoritos do utilizador
    if (favorito === "true") {
      where.favoritos = {
        some: { userId: req.user.id }
      };
    }

    // Ordenação
    let orderBy = undefined;
    if (sort) {
      const [campo, direcao] = sort.split("_");
      orderBy = { [campo]: direcao };
    }

    const animais = await prisma.animal.findMany({
      where,
      orderBy,
      include: {
        categoria: true,
        favoritos: true,
        partilhas: true
      }
    });

    res.json(animais);

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao filtrar animais" });
  }
});




router.post("/", authMiddleware, createAnimal);


export default router;

