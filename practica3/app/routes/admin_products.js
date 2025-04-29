const express = require('express');
const router = express.Router();
const { createProduct, updateProduct, deleteProduct } = require('../controllers/product');
const { validateAdmin } = require('../controllers/utils');

router.use(validateAdmin);

//endpoint POST/admin/products
router.post('/', createProduct);

//endpoint PUT/admin/products/:id
router.put('/:id', updateProduct);

//endpoint DELETE/admin/products/:id
router.delete('/:id', deleteProduct);

module.exports = router;