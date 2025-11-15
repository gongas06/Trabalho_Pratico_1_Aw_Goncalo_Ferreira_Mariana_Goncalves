import express from "express";
import { partilharAnimal } from "../controllers/partilhaController.js";

const router = express.Router();

router.post("/:id/partilhar/:userId", partilharAnimal);

export default router;
