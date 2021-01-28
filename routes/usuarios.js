const express = require('express')
const router = express.Router()
const UsuariosController = require('../controllers/usuarios-controllers')

router.post('/cadastro', UsuariosController.cadastrarUsuarios)
router.post('/login', UsuariosController.loginUsuarios)

module.exports = router
