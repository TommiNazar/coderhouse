const fs = require('fs');



class ProductManager {

    #id = 0
    path = './product.json';
    products=[]

    constructor() {
        
        
		// Si no existe ruta
		if (!fs.existsSync(this.path)) {
			// escribo el archivo de forma sincronica con un array vacio
			fs.writeFileSync(this.path, JSON.stringify(this.products));
		}


	}

    async addProduct(product){
        try {
			// Obtengo los productos actuales
			const actualProduct = await this.getProduct();
			// Agrego el nuevo producto
			actualProduct.push(product);

            product.id = this.#getID();

			// Escribo nuevamente le archivo './product.json'
			await fs.promises.writeFile(
				'./product.json',
				JSON.stringify(actualProduct)// Transformo el array en string                
			);
            return product
		} catch (err) {
			// Si hay error imprimo el error en consola
			console.log('No puedo agregar producto');
		}
    }


    async getProduct(){

        try{
            const actualProduct = await fs.promises.readFile(
                './product.json',
                'utf-8'
            );
    
            return JSON.parse(actualProduct);

            
        }
        catch (err) {
			// Si hay error imprimo el error en consola
			console.log('No puedo darte productos');
		}
        
    }

    #getID() {
        this.#id++
        return this.#id
        }

        getProductById (idProducto){

        
            const productsIndex = this.products.findIndex(
                (product) => product === idProducto
            );
            
    
            if (productsIndex  === -1) {
                console.log('No existe el producto');
        }
        else{
            console.log('el producto q esta buscando por id es:')
           
           console.log(productsIndex);
        }
        
        }
        

    

}



const products = new ProductManager();

// Creo una funcion asincronica
const test = async () => {
	
	try {
		// Agregar usuario

		await products.addProduct({
            
			nombre: 'capuchino',
			descripcion: 'cafe',
			precio: 1489,
			stock: 43,
		});
		// Agregar usuario

		await products.addProduct({
			nombre: 'cortado',
			descripcion: 'cafe',
			precio:32,
            stock: 24,
		});

		// Imprimo los usuarios que administra
		console.log(await products.getProduct());
	} catch (err) {
		// Si hay error imprimo el error en consola
		console.log('Salio mal el Test');
	}
};



// Ejecuto el test
test();

products.getProductById(2)
