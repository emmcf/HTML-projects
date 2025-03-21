import { Product } from './products.js';
import { generateUUID } from'./utils.js';

const products = [
    new Product(
        "df2008a5-1c40-4dd1-9db7-8aacc03ae2fb",
        "Platano",
        "Los mejores platanos de México, directo desde Tabasco.",
        "https://images.freeimages.com/images/large-previews/4ec/banana-s1326714.jpg",
        "pieza",
        15,
        3.6,
        "Fruta"
    ),
    new Product(
        "4186cb9b-6d4a-405b-8524-ce0cce57b6e3",
        "Pera",
        "Las mejores peras de México, grandes y jugosas.",
        "url",
        "pieza",
        35,
        4.6,
        "Fruta"
    ),
    new Product(
        "21a24091-54f0-4e8f-afaa-a3746634f8c1",
        "Zanahoria",
        "Las mejores zanahorias de México, mejoran la vista.",
        "url",
        "pieza",
        30,
        4.3,
        "Verdura"
    ),
    new Product(
        "890038be-9906-4a4e-9278-bd39e46f8708",
        "Filete de Res",
        "Los mejores filetes de res de México, frescos y sabrosos.",
        "https://images.freeimages.com/images/large-previews/4ec/banana-s1326714.jpg",
        "kg",
        42,
        55.5,
        "Carne"
    )
];

//PARA LEER
function getProducts() {
    return products;
}

function getProductById(uuid) {
    return products.find(product => product.uuid === uuid);
}

//PARA CREAR
function createProduct(product) {
    if (!(product instanceof Product)) {
        throw new ProductException("El producto debe ser una instancia de Product.");
    }
    products.push(product);
    console.log("Producto creado con éxito.")
    return product;
}

//PARA ACTUALIZAR
function updateProduct(uuid, updatedProduct) {
    if(!(updatedProduct instanceof Product)) {
        throw new ProductException("El producto actualizado debe ser una instancia de Product.");
    }
    const index = products.findIndex(product => product.uuid === uuid);
    if (index === -1) {
        throw new ProductException("El producto no ha sido encontrado.");
    }
    products[index] = updatedProduct;
    console.log("Producto actualizado con éxito.")
    return updatedProduct;
}

//PARA ELIMINAR
function deleteProduct(uuid) {
    const index = products.findIndex(product => product.uuid === uuid);
    if (index === -1) {
        throw new ProductException("El producto no ha sido encontrado.");
    }
    const deletedProduct = products.splice(index, 1);
    console.log("Producto eliminado con éxito.")
    return deletedProduct[0];
}

//PARA BUSCAR PRODUCTOS POR CATEGORÍA O POR NOMBRE
function findProduct(query) {
    const [categoryPart, titlePart] = query.includes(':') ? query.split(':').map(part => part.trim()) : [null, query.trim()];
    let filteredProducts;

    if (categoryPart && titlePart) {
        // Búsqueda por categoría y título
        filteredProducts = products.filter(product => 
            product.category.includes(categoryPart) && product.title.includes(titlePart)
        );
    } else if (categoryPart) {
        // Búsqueda solo por categoría
        filteredProducts = products.filter(product => product.category.includes(categoryPart));
    } else if (titlePart) {
        // Búsqueda solo por título
        filteredProducts = products.filter(product => product.title.includes(titlePart));
    } else {
        // Si no hay categoría ni título, devuelve todos los productos
        filteredProducts = products;
    }

    //En caso de que no se encuentre el Producto
    if (filteredProducts.length === 0) {
        return "No se encontraron productos que coincidan con la búsqueda.";
    }

    return filteredProducts;
}

//PARA CONVERTIR LA LISTA EN TEXTO
function productListToHTML(lista, htmlElement) {
    const text = lista.map(product => product.toHTML()).join("");
    htmlElement.innerHTML = text;
}

export { products, getProducts, getProductById, createProduct, updateProduct, deleteProduct, findProduct, productListToHTML };
