const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController'); 

router.get('/:IdUser', cartController.getFullCart);
router.delete('/:IdProduct', cartController.deleteProduct); 
router.put('/:IdProduct', cartController.updateProduct); 
router.delete('/', cartController.deleteCart); 
router.post('/insertItem', cartController.insertItemCart); 

module.exports = router;
