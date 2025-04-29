const { findProducts, insertProducts } = require('./data_handler');
const { v4: uuidv4 } = require('uuid');

//GET/products
function getAllProducts(req, res) { //mostrar todos los productos
    const products = findProducts();

    // Obtener los parámetros de búsqueda
    const query = req.query.query;

    // Filtrar en caso de que haya parámetros
    if (query) {
        const filtrado = products.filter(p => 
            p.name.toLowerCase().includes(query.toLowerCase()) || //Filtrar por nombre, o
            p.category.toLowerCase().includes(query.toLowerCase()) //Filtrar por categoría
        );
        return res.status(200).json(filtrado);
    }
    res.status(200).json(products);
};

//GET/products/:id
function getProductById(req, res) { //mostrar productos por su id
    const products = findProducts();
    // Buscar el producto por ID
    const product = products.find(p => p.uuid === req.params.id);

    if (!product) { //en caso de qu el ID sea no válido
        return res.status(404).setHeader('Content-Type', 'application/json').json({ error: "Producto no encontrado" });
    } else {
        res.status(200).setHeader('Content-Type', 'application/json').json(product);
    }
};

//POST/products/cart
function getCartProducts(req, res) { //insertar productos al carrito de compras
    if (!Array.isArray(req.body)) { //validar que el body recibido sea de tipo arreglo
        return res.status(400).json({ error: "El body debe de ser un arreglo" });
    }

    const products = findProducts();
    let cart = [];

    for (const item of req.body) {
        const encontrado = products.find(p => p.uuid === item.productUuid);
        if (!encontrado) {
            return res.status(404).json({ error: `El producto con ID ${item.productUuid} no ha sido encontrado.` });
        }
        //si se encontró, es insertado
        cart.push({ ...found, amount: item.amount });
    }
    res.status(200).json(cart);
};

//POST/admin/products
function createProduct(req, res) {
    try {
        //Validar que en el body se encuentren los atributos de interés
        const { name, imageUrl, description, unit, stock, price, category} = req.body;
        if (!name || !imageUrl || !description || !unit || !stock || !price || !category) {
            return res.status(400).json({ error: "Faltan atributos requeridos" });
        }

        //middleware de autentificar
        const products = findProducts();
        const nuevoProducto = {
            uuid: uuidv4(), //El ID se autogenera usando UUIDs
            name, 
            imageUrl,
            description,
            unit,
            stock,
            price,
            category
        };

        //guardar el nuevo producto en el arreglo
        products.push(nuevoProducto);
        //actualizar el archivo de productos
        insertProducts(products);

        res.status(201).json({ message: `El producto ${name} fue creado correctamente.` });
    } catch (err) {
        res.status(400).json({ error: "Error al crear producto." });
    }
};

//PUT/admin/products/:id
function updateProduct(req, res) {
    //middleware de autentificar
    const products = findProducts();

    //Verificar que el ID corresponda a un producto existente
    const index = products.findIndex(p => p.uuid === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    const { name, imageUrl, description, unit, stock, price, category} = req.body;
    //Validar que en el body se encuentren los atributos de interés
    if (!name || !imageUrl || !description || !unit || !stock || !price || !category) {
        return res.status(400).json({ error: "Faltan atributos requeridos" });
    }

    //guardar los cambios al producto en el arreglo
    products[index] = {
        ...products[index],
        name, 
        imageUrl,
        description,
        unit,
        stock,
        price,
        category
    };
    
    //actualizar el archivo de productos
    insertProducts(products);
    res.status(200).json({ message: `El producto ${name} fue actualizado correctamente.` });
};

//DELETE/admin/products/:id
function deleteProduct(req, res) {
    //middleware de autentificar
    const products = findProducts();
    
    const index = products.findIndex(p => p.uuid === req.params.id);
    //Verificar que el ID corresponda a un producto existente
    if (index === -1) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    //eliminacion de producto, guardar cambios en el arreglo
    const deletedProduct = products.splice(index, 1)[0];
    //actualizar el archivo de productos
    insertProducts(products);

    res.status(200).json({ message: `Producto ${deletedProduct.name} eliminado correctamente.` });
};

module.exports = {
    getAllProducts,
    getProductById,
    getCartProducts,
    createProduct,
    updateProduct,
    deleteProduct
};