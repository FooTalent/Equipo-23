import { Router } from 'express';
import { products } from '../../controllers/index.js';
import { authorization } from '../../middlewares/authMiddleware.js';
import { passportCall, passportCallOptional } from '../../middlewares/passportMiddleware.js';
import {validateCreateProduct} from '../../utils/validator/product.js'
import { uploader } from '../../utils/multer.js';

const productRouter = Router();

productRouter.post('/', passportCall('jwt'),authorization('admin','vendor'), uploader.array('thumbnails', 5),validateCreateProduct,products.createProduct);
productRouter.get('/', passportCallOptional('jwt'),products.getProducts);
productRouter.get('/:pid', passportCallOptional('jwt'),products.getProductById);
productRouter.put('/:pid',  passportCall('jwt'),authorization('admin','vendor'),products.updateProductById);
productRouter.delete('/:pid',  passportCall('jwt'),authorization('admin','vendor'), products.deleteProductById);
productRouter.post('/:pid/images',  passportCall('jwt'), authorization('vendor','admin'),uploader.array('thumbnails', 5), products.uploadProductImages);

export default productRouter;
