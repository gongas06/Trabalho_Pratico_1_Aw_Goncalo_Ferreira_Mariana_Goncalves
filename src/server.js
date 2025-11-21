import express from "express";
import authRoutes from "./routes/auth.js";
import animalRoutes from "./routes/animais.js";
import adotanteRoutes from "./routes/adotantes.js";
import adocaoRoutes from "./routes/adocoes.js";
import categoriaRoutes from "./routes/categorias.js";
import partilhaRoutes from "./routes/partilhas.js";

const app = express();
app.use(express.json());

// Rota raiz
app.get("/", (req, res) => {
    res.json({
        mensagem: "API de Gestão de Adoções",
        versao: "1.0.0",
        rotas: {
            auth: {
                register: "POST /auth/register",
                login: "POST /auth/login"
            },
            animais: {
                listar: "GET /animais",
                criar: "POST /animais",
                foto: "POST /animais/:id/foto",
                favoritos: "GET /animais/favoritos",
                toggleFavorito: "PUT /animais/:id/favorito"
            },
            adotantes: {
                listar: "GET /adotantes",
                criar: "POST /adotantes"
            },
            adocoes: {
                listar: "GET /adocoes",
                criar: "POST /adocoes",
                atualizar: "PUT /adocoes/:id",
                eliminar: "DELETE /adocoes/:id"
            },
            categorias: {
                listar: "GET /categorias",
                criar: "POST /categorias"
            },
            partilhas: {
                listar: "GET /partilhas",
                criar: "POST /partilhas"
            }
        }
    });
});

app.use("/uploads", express.static("uploads"));
app.use("/auth", authRoutes);
app.use("/animais", animalRoutes);
app.use("/adotantes", adotanteRoutes);
app.use("/adocoes", adocaoRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/partilhas", partilhaRoutes);

app.listen(3000, () => console.log("Servidor a correr em http://localhost:3000"));
