const fs = require('fs');
const path = require('path');

//ruta para obtener la ruta del archivo que contiene la lista de productos
const filePath = path.join(__dirname, '../data/products.json');

//funciones principales
function findProducts() { //leer
    //Cargar y parsear el archivo products.json en una variable products
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

function insertProducts(products) { //escribir
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf-8');
}

//console.log(products); //test

//exportar funciones para buscar e insertar productos
module.exports = {
    findProducts,
    insertProducts
};