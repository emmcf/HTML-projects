import { Product } from "./products.js";
import { generateUUID } from'./utils.js';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, findProduct, productListToHTML } from "./data_handler.js";
import { ShoppingCart } from "./shopping_cart.js"

//Pruebas de la clase Products
try {
    const product1 = new Product(
        generateUUID(),
        "Guayaba",
        "Las mejores guayabas de México, frescas y jugosas.",
        "url",
        "pieza",
        15,
        3.6,
        "Fruta"
    );

        // PRUEBAS 
    console.log(product1); //imprimir el producto creado

    //Consultar todos los productos
    console.log("Consulta de todos los productos.");
    console.log(getProducts()); 

    //Consultar un producto en específico 
    console.log("Consulta de un producto por su UUID.");
    const prodId = "21a24091-54f0-4e8f-afaa-a3746634f8c1";
    console.log(`UUID: ${prodId}`);
    console.log(getProductById(prodId));



        // PRUEBAS DE CRUD
    //método para crear un nuevo producto
    const newProduct = createProduct(
        new Product(
            generateUUID(),
            "Sandía",
            "Las mejores sandías de México, dulces, frescas y jugosas.",
            "url",
            "pieza",
            34,
            10.5,
            "Fruta"
        )
    );
    console.log("Creación de producto nuevo.");
    console.log(newProduct);
    console.log("UUID del producto nuevo", newProduct.uuid); 

    //método para actualizar un producto
    const upddatedProduct =  new Product(
        newProduct.uuid,
        newProduct.title,
        newProduct.description,
        newProduct.imageUrl,
        newProduct.unit,
        newProduct.stock,
        11.0,
        newProduct.category
    );
    const res = updateProduct(newProduct.uuid, upddatedProduct);
    console.log("Actualización de un producto.");
    console.log(res);

    //método para eliminar producto
    const deletedProduct = deleteProduct(newProduct.uuid);
    console.log("Eliminación de un producto.");
    console.log(deletedProduct);

    //métodos para buscar productos
    console.log("Búsqueda por categoría.");
    console.log(findProduct("Fruta:")); 

    console.log("Búsqueda por título.");
    console.log(findProduct(":Platano")); 

    console.log("Búsqueda por categoría y título.");
    console.log(findProduct("Fruta: Platano")); 

    //PRUEBAS DE LA CLASE ShoppingCart
    /*const product2 = new Product(
        generateUUID(),
        "Jicama",
        "Las mejores jicamas de México, frescas y jugosas.",
        "url",
        "pieza",
        15,
        3.6,
        "Fruta"
    );*/

    const carrito = new ShoppingCart();
    carrito.addItem(product1.uuid, 2);
    console.log("Carrito de compras actual");
    console.log(getProducts()); //antes de agregar productos

    //agregar productos al carrito
    carrito.addItem("df2008a5-1c40-4dd1-9db7-8aacc03ae2fb", 3); //platanos
    carrito.addItem("4186cb9b-6d4a-405b-8524-ce0cce57b6e3", 1); //pera
    carrito.addItem("21a24091-54f0-4e8f-afaa-a3746634f8c1", 4); //zanahorias
    carrito.addItem("890038be-9906-4a4e-9278-bd39e46f8708", 2); //kg de carne

    console.log("Carrito de compras después de añadir más productos");
    console.log(carrito.proxies);

    //actualizar un producto del carrito
    carrito.removeItem("df2008a5-1c40-4dd1-9db7-8aacc03ae2fb", 6); //cambiar a 6 platanos
    console.log("Carrito de compras después de actualizar un producto");
    console.log(carrito.proxies);

    //eliminar un producto del carrito
    carrito.removeItem("4186cb9b-6d4a-405b-8524-ce0cce57b6e3"); //eliminar pera
    console.log("Carrito de compras después de eliminar un producto");
    console.log(carrito.proxies);

    //calcular total de la compra
    const total = carrito.calculateTotal();
} catch (e) {
    console.error(e.message);
}

/*
//Pruebas de la clase ShoppingCart
try {
    const product2 = new Product(
        generateUUID(),
        "Jicama",
        "Las mejores jicamas de México, frescas y jugosas.",
        "url",
        "pieza",
        15,
        3.6,
        "Fruta"
    );
    const carrito = new ShoppingCart();
    carrito.addItem(product2.uuid, 2);
    console.log("Carrito de compras actual");
    console.log(getProducts()); //antes de agregar productos

    //agregar productos al carrito
    carrito.addItem("df2008a5-1c40-4dd1-9db7-8aacc03ae2fb", 3); //platanos
    carrito.addItem("4186cb9b-6d4a-405b-8524-ce0cce57b6e3", 1); //pera
    carrito.addItem("21a24091-54f0-4e8f-afaa-a3746634f8c1", 4); //zanahorias
    carrito.addItem("890038be-9906-4a4e-9278-bd39e46f8708", 2); //kg de carne

    console.log("Carrito de compras después de añadir más productos");
    console.log(carrito.proxies);

    //actualizar un producto del carrito
    carrito.removeItem("df2008a5-1c40-4dd1-9db7-8aacc03ae2fb", 6); //cambiar a 6 platanos
    console.log("Carrito de compras después de actualizar un producto");
    console.log(carrito.proxies);

    //eliminar un producto del carrito
    carrito.removeItem("4186cb9b-6d4a-405b-8524-ce0cce57b6e3"); //eliminar pera
    console.log("Carrito de compras después de eliminar un producto");
    console.log(carrito.proxies);

    //calcular total de la compra
    const total = carrito.calculateTotal();
    console-log("El total de la compra es: $", total);
} catch (e) {
    console.error(e.message);
}*/

//metodo que convierte a formato JSON
const jsonProduct = JSON.stringify({
    "uuid": "df2008a5-1c40-4dd1-9db7-8aacc03ae2fb", 
    "title": "Platano", 
    "description":"Los mejores platanos de México, directo desde Tabasco.", 
    "imageUrl":"https://images.freeimages.com/images/large-previews/4ec/banana-s1326714.jpg", 
    "unit": "pieza", 
    "stock": 15, 
    "pricePerUnit": 3.6, 
    "category":"Fruta"
});

const product = Product.createFromJson(jsonProduct);
console.log("Información del producto en formato JSON.");
console.log(product);

//prueba visual en el archivo HTML
const productListElement = ducument.getElementById("product-list");
const products = getProducts();
productListToHTML(products, productListElement);