class ProductManager {

        #id = 0

        constructor() {
            this.products = [];
        }
        
        getProducts() {
            return this.products;
        }
        
        addProduct(title, description, price, thumbnail, code, stock) { 

            const product = {
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }
        
        // Agrega ID al producto
        
            product.id = this.#getID();
        
        // Agrega el producto (product) a la lista de productos (products)
        
            this.products.push(product);
        
        }
        
        //Metodo privado para incrementar el ID + 1
        
        #getID() {
            this.#id++
            return this.#id
        
        }
    
    }
    
    // Pruebas
    
    const productManager = new ProductManager();
    productManager.addProduct('Producto de prueba', 'Este es un producto de prueba', 200, 'Sin imagen', 'abc123', 25);

    console.log(productManager.getProducts())