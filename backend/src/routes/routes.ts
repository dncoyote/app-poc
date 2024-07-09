import { Router } from 'express';
import { sayHello } from '../controller/helloController';
import { createProduct, deleteProduct, updateProduct } from '../controller/productController';
// import googleSheetsRoutes from './googleSheetsRoutes';
import { readSheet } from '../controller/googleSheetsController';
// import { getAllProducts, createProduct, deleteProduct, updateProduct } from '../controller/productController';


const router = Router();

router.get('/hello', sayHello);
router.post('/products', createProduct);
router.delete('/products/:id', deleteProduct);
router.put('/products/:id', updateProduct);
// router.get('/products', getAllProducts);
// router.use(googleSheetsRoutes);
router.get('/sheets', readSheet);

export default router;