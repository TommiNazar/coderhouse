const { log } = require('console');
const fs = require('fs');



class ProductManager {

    #id = 0

    constructor() {
        

		// Si no existe ruta
		if (!fs.existsSync('./product.json')) {
			// escribo el archivo de forma sincronica con un array vacio
			fs.writeFileSync('./product.json', JSON.stringify([]));
		}


	}

    async addProduct(product){
        try {
			// Obtengo los usuarios actuales
			const actualProduct = await this.getProduct();
			// Agrego el nuevo usuario
			actualProduct.push(product);

            product.id = this.#getID();

			// Escribo nuevamente le archivo ./users.json
			await fs.promises.writeFile(
				'./product.json',
				JSON.stringify(actualProduct) // Transformo el array en string
                

                
			);
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
        const productsid = this.#id
        return this.#id
        }

    

}

const products = new ProductManager();

// Creo una funcion asincronica
const test = async () => {
	// intento
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

