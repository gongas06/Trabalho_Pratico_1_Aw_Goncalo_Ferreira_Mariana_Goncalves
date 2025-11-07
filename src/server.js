const express = require('express');
const cors = require('cors');
const app = express();

const adotantesRoutes = require('./routes/adotantes');
const animaisRoutes = require('./routes/animais');
const adocoesRoutes = require('./routes/adocoes');

app.use(cors());
app.use(express.json());

app.use('/adotantes', adotantesRoutes);
app.use('/animais', animaisRoutes);
app.use('/adocoes', adocoesRoutes);

// ERRO GLOBAL
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, error: 'Erro interno do servidor' });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`API a correr em http://localhost:${PORT}`));
