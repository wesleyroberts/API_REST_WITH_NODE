const mysql = require('../mysql').pool

exports.getPedidos = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error
      })
    }
    conn.query(
          `SELECT pedidos.id_pedidos,
                                pedidos.quantidade,
                                produtos.id_produtos,
                                produtos.nome,
                                produtos.preco
                           FROM pedidos
                     INNER JOIN produtos
                             ON produtos.id_produtos= pedidos.id_produtos`,
          (error, result, fields) => {
            if (error) {
              return res.status(500).send({
                error: error
              })
            }
            const response = {
              pedidos: result.map((pedido) => {
                return {
                  id_pedido: pedido.id_pedidos,
                  quantidade: pedido.quantidade,
                  produto: {
                    id_produto: pedido.id_produtos,
                    nome: pedido.nome,
                    preco: pedido.preco
                  },

                  request: {
                    tipo: 'GET',
                    descricao: 'Retorna os detalhes de um pedido especifico',
                    url: 'http://localhost:3000/pedidos/' + pedido.id_pedidos
                  }
                }
              })
            }
            return res.status(200).send(response)
          }
    )
  })
}

exports.postPedidos = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error
      })
    }
    conn.query(
      'SELECT * FROM produtos WHERE id_produtos=?;',
      [req.body.id_produto],
      (error, result, field) => {
        if (error) {
          return res.status(500).send({
            error: error
          })
        }
        if (result.length === 0) {
          return res.status(404).send({
            mensagem: 'Produto não encontrado'
          })
        }
        conn.query(
          'INSERT INTO pedidos(id_produtos ,quantidade) VALUES(?,?)',
          [req.body.id_produto, req.body.quantidade],
          (error, result, field) => {
            conn.release() // nunca deixe de fazer, pois quando entrar no callback tem que liberar essa conecxao
            if (error) {
              return res.status(500).send({
                error: error
              })
            }
            const response = {
              mensagem: 'Pedido inserido com sucesso',
              pedidoCriado: {
                id_pedido: result.id_pedidos,
                id_produto: req.body.id_produtos,
                quantidade: req.body.quantidade,
                request: {
                  tipo: 'GET',
                  descricao: 'Retorna todos os pedidos',
                  url: 'http://localhost:3000/pedidos'
                }
              }
            }
            return res.status(201).send(response)
          }
        )
      }
    )
  })
}

exports.getOnePedido = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error
      })
    }
    conn.query(
      'SELECT * FROM pedidos WHERE id_pedidos = ?;',
      [req.params.id_pedido],
      (error, result, fields) => {
        if (error) {
          return res.status(500).send({
            error: error
          })
        }
        if (result.length === 0) {
          return res.status(404).send({
            mensagem: 'Não foi encontrado nenhum pedio'
          })
        }
        const response = {
          pedido: {
            id_pedido: result[0].id_pedidos,
            id_produto: result[0].id_produtos,
            quantidade: result[0].quantidade,
            request: {
              tipo: 'GET',
              descricao: 'retorna todos os pedidos',
              url: 'http://localhost:3000/predidos'
            }
          }
        }
        return res.status(200).send(response)
      }
    )
  })
}
exports.deletePedidos = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error
      })
    }
    conn.query(
      'DELETE FROM pedidos WHERE id_pedidos = ?',
      [req.body.id_pedido],
      (error, resutlado, field) => {
        conn.release() // nunca deixe de fazer, pois quando entrar no callback tem que liberar essa conecxao
        if (error) {
          return res.status(500).send({
            error: error
          })
        }
        const response = {
          mensagem: 'Pedido removido com sucesso',
          request: {
            tipo: 'POST',
            descricao: 'Insere um pedido',
            url: 'http://localhost:3000/pedidos',
            body: {
              id_produto: 'Number',
              quantidade: 'Number'
            }
          }
        }
        return res.status(202).send(response)
      }
    )
  })
}
