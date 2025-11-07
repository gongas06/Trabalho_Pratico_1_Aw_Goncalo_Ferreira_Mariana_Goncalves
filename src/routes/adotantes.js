const express = require('express');
const router = express.Router();
const adotanteController = require('../controllers/adotanteController');

router.post('/', adotanteController.criar);
router.get('/', adotanteController.listar);
router.get('/:id', adotanteController.obter);
router.put('/:id', adotanteController.atualizar);
router.delete('/:id', adotanteController.remover);

module.exports = router;
