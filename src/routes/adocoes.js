import express from "express";
import { createAdocao, updateEstado } from "../controllers/adocaoController.js";

const router = express.Router();

router.post("/", createAdocao);
router.put("/:id/estado", updateEstado);

export default router;
