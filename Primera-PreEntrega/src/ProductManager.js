import * as fs from 'fs';

class ProductManager {

    #id = 0;

    constructor() {

        this.path = './src/productos.json';
        
    }

    #getId() {

        this.#id++;
        return this.#id;
    }

    async addProduct(producto) {

        try {

            const productosActuales = await this.getProducts();
            
            const nuevoProducto = [ ...productosActuales, producto ];            
            await fs.promises.writeFile(this.path, JSON.stringify(nuevoProducto));

        } catch (error) {

            console.log(`Error al agregar producto ${error}`);
        }
    }

    async getProducts() {

        try {

            const actualProducts = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(actualProducts);

        } catch (error) {

            console.log(`${error}`);
        }
    }

    async getProductById(idProducto) {

        try {

            let productoIndex = await this.getProducts();
            let filtrado = productoIndex.find((pro) => pro.id === idProducto);
            
            return filtrado;

        } catch (error) {

            console.log(`${error}`);
        }
    }

    async updateProduct(id, { ...producto }) {

        let productList = await this.getProducts();
        let productoModificar;

        try {

            productoModificar = productList.findIndex((pro) => pro.id === id);

            if (productoModificar) {

                productList[productoModificar] = { ...producto, id };
                await fs.promises.writeFile(this.path, JSON.stringify(productList));

            } else {

                console.log('No existe id del producto');
            }

        } catch (error) {

            console.log(`${error}`);
        }
    }

    async deleteProduct(idProducto) {

        try {

            let productoIndex = await this.getProducts();
            let filtrado = productoIndex.filter((pro) => pro.id != idProducto); //Filter devuelve array de elementos
            await fs.promises.writeFile(this.path, JSON.stringify(filtrado));

        } catch (error) {

            console.log(`${error}`);
        }
    }
};

export default ProductManager;