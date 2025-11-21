import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { criarPartilha, listarPartilhas } from "../controllers/partilhaController.js";

const router = express.Router();

router.post("/", authMiddleware, criarPartilha);
router.get("/", authMiddleware, listarPartilhas);

export default router;

