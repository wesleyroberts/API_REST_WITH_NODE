const express = require('express')
const app = express() // criamos uma instancia do express
const morgan = require('morgan')//
const bodyParser = require('body-parser')

const rotaProdutos = require('./routes/produtos')
const rotaPedidos = require('./routes/pedidos')
const rotaUsiarios = require('./routes/usuarios')

app.use(morgan('dev'))// é uma forma de logar ou mostrar quais requisições estão chegando em nosso servidor HTTP, seja ele feito no Express ou em Node puro utilizando o módulo HTTP
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: false }))// apenas dados simples
app.use(bodyParser.json())// json de entrada no body

app.use((req, res, next) => {
  res.header('Acces-Control-Allow-Origin', '*')
  res.header('Acces-Control-Allow-Header',
    'Origin,x-Requrested-with, Content-Type, Accept, Authorization '
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET ')
    return res.status(200).send({})
  }
  next()
})

app.use('/usuarios', rotaUsiarios)
app.use('/produtos', rotaProdutos)
app.use('/pedidos', rotaPedidos)

// Tratamento de quando não encontra nenhuma rorta
app.use((req, res, next) => {
  const erro = new Error('não encontrado')
  erro.status = 404
  next(erro)
})
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  return res.send({
    erro: {
      mensagem: error.message
    }
  })
})

module.exports = app
