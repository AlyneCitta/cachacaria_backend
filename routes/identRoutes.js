const express = require('express');
const router = express.Router();
const identController = require('../controllers/identController'); 

router.get('/:IdUser', identController.getIdentByIdUser);
router.post('/updateIdent', identController.updateIdentification);
router.delete('/deleteIdent', identController.deleteIdentification);

module.exports = router;
