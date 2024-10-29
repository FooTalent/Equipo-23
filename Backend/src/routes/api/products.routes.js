import { Router } from 'express';
import { products } from '../../controllers/index.js';
import { authorization } from '../../middlewares/authMiddleware.js';
import { passportCall, passportCallOptional } from '../../middlewares/passportMiddleware.js';
import { validateCreateProduct } from '../../utils/validator/product.js'
import upload from '../../utils/multer.js';
import { getProductAuth } from '../../middlewares/getProductAuth.js';
import { productIsMine } from '../../middlewares/productIsMine.js';

const productRouter = Router();

productRouter.post('/', passportCall('jwt'), authorization('admin', 'vendor'), upload.any('thumbnails', 5), validateCreateProduct, products.createProduct);
productRouter.get('/', passportCallOptional('jwt'), products.getProducts);
productRouter.get('/search/prod', products.searchProducts)
productRouter.get('/:pid', passportCallOptional('jwt'), getProductAuth('admin', 'vendor', 'user'), products.getProductById);

productRouter.put('/:pid', passportCall('jwt'), authorization('admin', 'vendor'), products.updateProductById);
productRouter.delete('/:pid', passportCall('jwt'), authorization('admin', 'vendor'), products.deleteProductById);
productRouter.post('/:pid/images', passportCall('jwt'), authorization('vendor', 'admin'), upload.array('thumbnails', 5), products.uploadProductImages);
productRouter.put('/:pid/images', passportCall('jwt'), authorization('vendor', 'admin'), productIsMine(), upload.array('thumbnails', 5), products.updateProductImages);
export default productRouter;
