import express from "express";
import { getAnimais, createAnimal, toggleFavorito } from "../controllers/animalController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authMiddleware, getAnimais);
router.post("/", authMiddleware, createAnimal);
router.put("/:id/favorito", authMiddleware, toggleFavorito);

export default router;
