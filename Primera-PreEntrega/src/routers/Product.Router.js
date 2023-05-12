import { Router } from 'express';
import ProductManager from '../ProductManager.js';

const pm = new ProductManager();
const productRouter = Router();

productRouter.get('/', async (req, res) => {

    let listado = await pm.getProducts();
    let limite = req.query.limit;

    if (limite) {

        res.send(await listado.slice(0, limite));

    } else {

        res.send({listado});

    }

});

productRouter.get('/:id', async (req, res) => {

    try {

        let productoEncontrado = await pm.getProductById(parseInt(req.params.id));

        if (productoEncontrado != undefined) {

            res.send({productoEncontrado});

        } else {

            res.status(400).send('No existe el ID');

        }

    } catch (error) {

        res.status(400).send(`Hubo un error al encontrar el ID ${error}`);
    }
});

productRouter.post('/', async (req, res) => {

    try {

        let nuevoProducto = req.body;
        res.send(await pm.addProduct(nuevoProducto));

    } catch (error) {

        res.status(400).send(`${error}`);

    }
});

productRouter.put('/:id', async (req, res) => {

    try {

        let pid = req.params.id;
        let nuevoProducto = req.body;

        res.send(await pm.updateProduct(pid, nuevoProducto));

    } catch (error) {

        res.status(400).send(`${error}`);

    }
});

productRouter.delete('/:id', async (req, res) => {

    try {

        let pid = req.params.id;
        res.send(await pm.deleteProduct(pid));

    } catch (error) {

        res.status(400).send(`${error}`);
    }
});

export { productRouter };