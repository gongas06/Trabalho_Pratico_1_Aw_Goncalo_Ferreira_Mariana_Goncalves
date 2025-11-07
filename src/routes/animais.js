const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');

router.post('/', animalController.criar);
router.get('/', animalController.listar);
router.get('/:id', animalController.obter);
router.put('/:id', animalController.atualizar);
router.delete('/:id', animalController.remover);

module.exports = router;
