const path = require('path');

//Ruta para archivo Principal html
function getHome(req, res) {
    res.sendFile(path.join(__dirname, '../views/home.html'));
}

//Ruta para archivo de Carrito de compras html
function getShoppingCart(req, res) {
    res.sendFile(path.join(__dirname, '../views/shopping_cart.html'));
}

//Ruta para archivo de prueba
function prueba(req, res) {
    res.send('e-commerce app práctica 3');
}

module.exports = {
    getHome,
    getShoppingCart,
    prueba
};