import prisma from "../prisma/client.js";

// Toggle favorito (adiciona ou remove)
export const toggleFavorito = async (req, res) => {
  try {
    const animalId = Number(req.params.id);
    const userId = req.user.id;

    // Verifica se o animal existe
    const animal = await prisma.animal.findUnique({ where: { id: animalId } });
    if (!animal) {
      return res.status(404).json({ erro: "Animal não encontrado" });
    }

    // Verifica se já existe um favorito
    const favoritoExistente = await prisma.favorito.findUnique({
      where: {
        userId_animalId: { userId, animalId }
      }
    });

    if (favoritoExistente) {
      // Remove dos favoritos
      await prisma.favorito.delete({
        where: { id: favoritoExistente.id }
      });
      return res.json({ mensagem: "Removido dos favoritos" });
    } else {
      // Adiciona aos favoritos
      const novoFavorito = await prisma.favorito.create({
        data: { userId, animalId }
      });
      return res.json({ mensagem: "Adicionado aos favoritos", favorito: novoFavorito });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao atualizar favorito" });
  }
};

// Obter todos os favoritos do utilizador
export const getFavoritos = async (req, res) => {
  try {
    const userId = req.user.id;

    const favoritos = await prisma.favorito.findMany({
      where: { userId },
      include: {
        animal: {
          include: { categoria: true }
        }
      }
    });

    res.json(favoritos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao obter favoritos" });
  }
};
