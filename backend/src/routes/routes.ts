import { Router } from 'express';
import { sayHello } from '../controller/helloController';
import { readSheet } from '../controller/googleSheetsController';
import { readGoogleSheetStatement } from '../controller/statementsGoogleSheetsController';
import { getAllProducts, createProduct, deleteProduct, updateProduct, getProductById } from '../controller/productController';
import { getAllStatements, createStatement, deleteStatement, updateStatement, getStatementById } from '../controller/statementController';


const router = Router();

router.get('/hello', sayHello);
router.post('/products', createProduct);
router.delete('/products/:id', deleteProduct);
router.put('/products/:id', updateProduct);
router.get('/products/:id', getProductById);
router.get('/products', getAllProducts);
router.get('/sheets', readSheet);

router.post('/statements', createStatement);
router.delete('/statements/:id', deleteStatement);
router.put('/statements/:id', updateStatement);
router.get('/statements/:id', getStatementById);
router.get('/statements', getAllStatements);

router.get('/statementSheets', readGoogleSheetStatement);

export default router;