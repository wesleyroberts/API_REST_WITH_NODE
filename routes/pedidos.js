const express = require('express');
const router = express.Router();


//RETORNA TODOS OS PEDIDOS
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retorna os pedidos'
    });
});

//INSERE UM PEDIDOS
router.post('/', (req, res, next) => {
    const pedido={
        id_produto: req.body.id_produto,
        quantidade: req.body.quantidade
    };
    res.status(201).send({
        mensagem: 'O pedido foi criado',
        pedidoCriado: pedido
    });
});

//RETORNA OS DADOS DE UM PEDIDOS
router.get('/:id_pedido', (req, res, next) => {
    const id = req.params.id_produto
        res.status(200).send({
            mensagem: 'Detalhes do pedido',
            id_pedido: id
        }); 
});

//ALTERA UM PRODUTO
router.patch('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Pedido alterado com sucesso'
    });
});

//DELETA UM PRODUTO
router.delete('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'O pedido foi excluido com sucesso'
    });
});
module.exports = router;