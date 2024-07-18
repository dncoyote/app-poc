import { Router } from 'express';
import { sayHello } from '../controller/helloController';
import { readSheet } from '../controller/googleSheetsController';
import { getAllProducts, createProduct, deleteProduct, updateProduct, getProductById } from '../controller/productController';

const router = Router();

router.get('/hello', sayHello);
router.post('/products', createProduct);
router.delete('/products/:id', deleteProduct);
router.put('/products/:id', updateProduct);
router.get('/products/:id', getProductById);
router.get('/products', getAllProducts);
router.get('/sheets', readSheet);

export default router;