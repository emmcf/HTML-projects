import { getProductById } from './data_handler.js';

class ProductProxy {
    constructor(productUuid, quantity) {
        this.productUuid = productUuid;
        this.quantity = quantity;
    }
}

class ShoppingCartException extends Error {
    constructor(err) {
        super();
        this.err = err;
        if (err) {
            this.msj = "ProductException: " + err;
        }
    }
}

class ShoppingCart {
    constructor() {
        this._proxies = [];
        this._products = [];
    }

    addItem(productUuid, amount) {
        if (amount <= 0) {
            throw new ShoppingCartException("La cantidad tiene que ser mayor a 0.");
        }
        const product = getProductById(productUuid);
        if (!product) {
            throw new ShoppingCartException("El producto no se ha encontrado.");
        }
        const ExProxy = this._proxies.find(proxy => proxy.productUuid === productUuid);
        if (ExProxy) {
            ExProxy.quantity += amount;
        } else {
            this._proxies.push(new ProductProxy(productUuid, amount));
            this._products.push({ ...product }); //se envía una copia a los productos
        }
    }

    updateItem(productUuid, newAmount) {
        if (newAmount < 0) {
            throw new ShoppingCartException("La cantidad no puede ser un número negativo.");
        } 
        
        const ExProxy = this._proxies.find(proxy => proxy.productUuid === productUuid);
        if (!ExProxy) {
            throw new ShoppingCartException("El producto no se encontra en el carrito.");
        }

        if (newAmount === 0) {
            this.removeItem(productUuid);
        } else {    
            ExProxy.quantity = newAmount;
        }
    }

    removeItem(productUuid) {
        const proxIndex = this._proxies.findIndex(proxy => proxy.productUuid === productUuid);
        if (proxIndex === -1) {
            throw new ShoppingCartException("El producto no se encontra en el carrito.");
        }
        this._proxies.splice(proxIndex, 1);
        this._products.splice(proxIndex, 1);
    }

    calculateTotal() {
        return this._proxies.reduce((total, proxy) => {
            const product = this._products.find(prox => prox._uuid === proxy.productUuid);
            if (!product) {
                throw new ShoppingCartException("El producto no ha sido encontrado.");
            }
            return total + product._pricePerUnit * proxy.quantity;
        }, 0);
    }

    get products() {
        return [...this._products];
    }

    get proxies() {
        return [...this._proxies];
    }
}

export { ShoppingCart, ProductProxy, ShoppingCartException };