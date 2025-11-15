import express from "express";
import authRoutes from "./routes/auth.js";
import animalRoutes from "./routes/animais.js";
import adotanteRoutes from "./routes/adotantes.js";
import adocaoRoutes from "./routes/adocoes.js";
import categoriaRoutes from "./routes/categorias.js";
import partilhaRoutes from "./routes/partilhas.js";

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/animais", animalRoutes);
app.use("/adotantes", adotanteRoutes);
app.use("/adocoes", adocaoRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/partilhas", partilhaRoutes);

app.listen(3000, () => console.log("Servidor a correr na porta 3000"));
