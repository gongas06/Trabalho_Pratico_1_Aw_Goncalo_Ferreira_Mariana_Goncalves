const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verifica se existe o header Authorization
  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  // Formato esperado: "Bearer <token>"
  const token = authHeader.split(" ")[1];

  try {
    // Valida o token
    const decoded = jwt.verify(token, "SECRET_KEY");

    // Coloca info do user dentro do request
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
};

