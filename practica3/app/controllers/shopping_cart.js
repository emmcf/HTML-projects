const { findProducts } = require('./data_handler');

function getCartProducts(req, res) {
    if (!Array.isArray(req.body)) { //validar que el body recibido sea de tipo arreglo
        return res.status(400).json({ error: "El body debe de ser un arreglo" });
    }

    //middleware de autentificar
    const products = findProducts();
    let cart = [];

    for (const item of req.body) {
        const found = products.find(p => p.uuid === item.productUuid);
        if (!found) {
            return res.status(404).json({ error: `Producto con ID ${item.productUuid} no encontrado` });
        }
        //si se encontró, es insertado
        cart.push({ ...found, amount: item.amount });
    }
    res.status(200).json(cart);
}

module.exports = {
    getCartProducts
};