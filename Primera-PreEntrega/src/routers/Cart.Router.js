import { Router } from "express";
import CartManager from "../CartManager.js";

const cartRouter = Router();
const cm = new CartManager();

cartRouter.post('/', async (req, res) => {

    try {

        let nuevoProducto = req.body;
        res.send(await cm.addCart(nuevoProducto));

    } catch (error) {

        res.status(400).send(`${error}`);
    }
});

cartRouter.get('/:cid', async (req, res) => {

    try {

        let productoEncontrado = await cm.getProductById(parseInt(req.params.id));

        if (productoEncontrado != undefined) {

            res.send(productoEncontrado);

        } else {

            res.status(400).send('No existe ID');

        }
    } catch (error) {

        res.status(400).send(`${error}`);

    }
});

export { cartRouter };