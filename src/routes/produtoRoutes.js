const express = require('express');
const router = express.Router();

// importa o controller
const produtoController = require('../controllers/produtoController');

// todas as rotas com '/produtos' — padrão consistente
router.get('/produtos', produtoController.index);       // listar
router.post('/produtos', produtoController.store);      // cadastrar
router.put('/produtos/:id', produtoController.update);  // atualizar
router.delete('/produtos/:id', produtoController.destroy); // excluir

module.exports = router;