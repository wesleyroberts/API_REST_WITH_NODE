const express = require('express');
const router = express.Router();
const mysql= require('../mysql').pool;


//RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retorna todos os produtos'
    });
});
//INSERE UM PRODUTO
router.post('/', (req, res, next) => {
    mysql.getConnection((error,conn)=>{
        conn.query(
            'INSERT INTO produtos(nome,preco) VALUES(?,?)',
            [req.body.nome, req.body.preco],
            (error, resutlado,field)=>{
                conn.release();//nunca deixe de fazer, pois quando entrar no callback tem que liberar essa conecxao
                if (error){
                    res.status(500).send({
                        error:error,
                        reponse:null
                    });
                }
                res.status(201).send({
                    mensagem: 'produto inserido com sucesso',
                    id_produto: resutlado.insertId
                });  
            }
        )
    });
});

//RETORNA OS DADOS DE UM PRODUTO
router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto


    if (id === 'especial') {
        res.status(200).send({
            mensagem: 'Você descobriu o id especial',
            id: id
        });
    } else {
        res.status(200).send({
            mensagem: 'Você passou um ID',

        });
    }

});

//ALTERA UM PRODUTO
router.patch('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Altera um produtos'
    });
});

//DELETA UM PRODUTO
router.delete('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Deleta um produto'
    });
});
module.exports = router;