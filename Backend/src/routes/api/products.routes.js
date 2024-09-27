import { Router } from 'express';
import { products } from '../../controllers/index.js';
import { authorization } from '../../middlewares/authMiddleware.js';
import { passportCall, passportCallOptional } from '../../middlewares/passportMiddleware.js';
import {validateCreateProduct} from '../../utils/validator/product.js'
import { uploader } from '../../utils/multer.js';

const productRouter = Router();

productRouter.post('/', passportCall('jwt'),authorization('admin','premium'), uploader.array('thumbnails', 5),validateCreateProduct,products.createProduct);
productRouter.get('/', passportCallOptional('jwt'),products.getProducts);
productRouter.get('/:pid', passportCallOptional('jwt'),products.getProductById);
productRouter.put('/:pid',  passportCall('jwt'),authorization('admin','premium'),products.updateProductById);
productRouter.delete('/:pid',  passportCall('jwt'),authorization('admin','premium'), products.deleteProductById);
productRouter.post('/:pid/images',  passportCall('jwt'), authorization('premium','admin'),uploader.array('thumbnails', 5), products.uploadProductImages);

export default productRouter;
