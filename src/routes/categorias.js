import express from "express";
import { createCategoria, getCategorias } from "../controllers/categoriaController.js";

const router = express.Router();

router.get("/", getCategorias);
router.post("/", createCategoria);

export default router;
