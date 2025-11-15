const express = require('express');
const router = express.Router();

const { 
  register,
  login,
  registerValidators,
  loginValidators
} = require('../controllers/authController');

router.post('/register', registerValidators, register);
router.post('/login', loginValidators, login);

module.exports = router;
