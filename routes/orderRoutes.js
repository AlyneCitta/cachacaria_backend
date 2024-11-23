const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController'); 


router.post('/', orderController.insertOrder);
router.post('/:IdPedido', orderController.insertItemOrder);
router.get('/:IdUser', orderController.getOrderByUser);


module.exports = router;
