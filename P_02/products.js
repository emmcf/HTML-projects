//Importar metodo que genera el UUID
import { generateUUID } from'./utils.js';

//prueba del metodo que genera el UUID
const id = generateUUID();
console.log(`El ID generado es: ${id}\n`)

class ProductException extends Error {
    constructor(err) {
        super();
        this.err = err;
        if (err) {
            this.msj = "ProductException: " + err;
        }
    }
}

class Product {
    //CONSTRUCTOR
    constructor(uuid, title, description, imageUrl, unit, stock, pricePerUnit, category) {
        this._uuid = uuid || generateUUID();
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.unit = unit;
        this.stock = stock;
        this.pricePerUnit = pricePerUnit;
        this.category = category;
    }

    //MÉTODOS GET
    get uuid() {
        return this._uuid;
    }

    get title() {
        return this._title;
    }

    get description() {
        return this._description;
    }

    get imageUrl() {
        return this._imageUrl;
    }

    get unit() {
        return this._unit;
    }

    get stock() {
        return this._stock;
    }

    get pricePerUnit() {
        return this._pricePerUnit;
    }

    get category() {
        return this._category;
    }
    
    //MÉTODOS SET
    set uuid(value) {
        throw new ProductException("No es posible modificar el UUID de forma manual.");
    }

    set title(value) {
        if (!value || typeof value !== "string" || value.trim() === "") throw new ProductException("El título no puede estar vacío.");
        this._title = value;
    }

    set description(value) {
        if (!value || typeof value !== "string" || value.trim() === "") throw new ProductException("La descripción no puede estar vacía.");
        this._description = value;
    }

    set imageUrl(value) {
        if (!value || typeof value !== "string" || value.trim() === "") throw new ProductException("La URL de la imagen no puede estar vacía.");
        this._imageUrl = value;
    }

    set unit(value) {
        if (!value || typeof value !== "string" || value.trim() === "") throw new ProductException("La unidad no puede estar vacía.");
        this._unit = value;
    }

    set stock(value) {
        if (value < 0 || typeof value !== "number") throw new ProductException("El stock no puede ser un número negativo.");
        this._stock = value;
    }

    set pricePerUnit(value) {
        if (value < 0 || typeof value !== "number") throw new ProductException("El precio por unidad no puede ser un número negativo.");
        this._pricePerUnit = value;
    }

    set category(value) {
        if (!value || typeof value !== "string" || value === "") throw new ProductException("La categoría no puede estar vacía.");
        this._category = value;
    }

    //MÉTODOS ESTÁTICOS
    static createFromJson(jsonValue) {
        try {
            const obj = JSON.parse(jsonValue);
            return Product.createFromObject(obj);
        } catch (err) {
            throw new ProductException("ERROR. JSON no válido: " + err.message);
        }
    }

    static createFromObject(obj) {
        const cleanedObj = Product.cleanObject(obj);
        return new Product(
            cleanedObj.uuid,
            cleanedObj.title,
            cleanedObj.description,
            cleanedObj.imageUrl,
            cleanedObj.unit,
            cleanedObj.stock,
            cleanedObj.pricePerUnit,
            cleanedObj.category,
        );
    }

    static cleanObject(obj) {
        const validKeys = ["uuid", "title", "description", "imageUrl", "unit", "stock", "pricePerUnit", "category"];
        let cleanedObj = {};
        for (const key of validKeys) {
            if (obj.hasOwnProperty(key)) {
                cleanedObj[key] = obj[key];
            }
        }
        return cleanedObj;
    }

    //MÉTODO PARA CONVERTIR A FORMATO HTML
    toHTML() {
        return `
            <div class="col-6 col-md-4 col-lg-3 mb-4">
                <div class="card h-100">
                    <img class="card-img-top" src="${this.imageUrl}" alt="${this.title}">
                    <div class="card-body">
                        <h5 class="card-title">${this.title}</h5>
                        <p class="card-text">${this.description}</p>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><strong>Stock:</strong> ${this.stock} productos disponibles</li>
                            <li class="list-group-item"><strong>Precio:</strong> $${this.pricePerUnit.toFixed(2)} por ${this.unit}.</li>
                            <li class="list-group-item"><strong>Categoría:</strong> ${this.category}</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }
}
export { Product, ProductException };
