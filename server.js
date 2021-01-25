const http = require('http')// cria serviço http
const app = require('./app')
const port = process.env.PORT || 3000 // variavel para salvar porta, caso não seja inserida a porta , pega a 3000 por padrão

const server = http.createServer(app)// cria nosso server
server.listen(port)
