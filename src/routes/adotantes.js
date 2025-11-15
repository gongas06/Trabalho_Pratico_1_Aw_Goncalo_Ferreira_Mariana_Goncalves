import express from "express";
import { createAdotante, getAdotantes } from "../controllers/adotanteController.js";

const router = express.Router();

router.get("/", getAdotantes);
router.post("/", createAdotante);

export default router;
