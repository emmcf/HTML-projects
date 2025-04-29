const express = require('express');
const app = express();
const productsRouter = require('./app/routes/products');
const adminProductsRouter = require('./app/routes/admin_products');
const { getHome, getShoppingCart, prueba } = require('./app/controllers/router');

const port = 3000;

//Cargar globalmente el middleware que permite parserar a formato JSON
app.use(express.json());

//Usar rutas
app.use('/products', productsRouter);
app.use('/admin/products', adminProductsRouter);

//Definir las rutas raiz 
app.get('/prueba', prueba);
app.get('/', getHome);
app.get('/home', getHome);
app.get('/shopping_cart', getShoppingCart);

//Levantar el servicio en el puerto 3000
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
    