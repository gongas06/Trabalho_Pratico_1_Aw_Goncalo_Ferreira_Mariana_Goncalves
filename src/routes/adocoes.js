const express = require('express');
const router = express.Router();
const adocaoController = require('../controllers/adocaoController');

router.post('/', adocaoController.criar);
router.get('/', adocaoController.listar);
router.put('/:id/aprovar', adocaoController.aprovar);
router.put('/:id/rejeitar', adocaoController.rejeitar);
router.delete('/:id', adocaoController.remover);

module.exports = router;
