import express from 'express';
HEAD

import { cartRouter } from './routers/Cart.Router.js'
edicion
import { productRouter } from './routers/Product.Router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.listen(8080, () => {

    console.log('Escuchando puerto 8080');

});