const express = require('express');
const router = express.Router();


const produtoController = require('../controllers/produtoController');

router.get('/produtos', produtoController.index);       
router.post('/produtos', produtoController.store);      
router.put('/produtos/:id', produtoController.update);  
router.delete('/produtos/:id', produtoController.destroy); 

module.exports = router;