const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById } = require('../controllers/product');
const { getCartProducts } = require('../controllers/shopping_cart'); 

//endpoint GET/products
router.get('/', getAllProducts);

//endpoint GET/products/:id
router.get('/:id', getProductById);

//endpoint POST/products/cart
router.post('/cart', getCartProducts);

module.exports = router;