import { Router } from "express";
import { carts } from '../../controllers/index.js';
import { authorization } from "../../middlewares/authMiddleware.js";
import { passportCall } from "../../middlewares/passportMiddleware.js";

const cartRouter = Router();

// ------ Only permission ADMIN -----
cartRouter.get("/", passportCall('jwt'), authorization('admin'), carts.getCarts);

// The user can only get his cart and the admin ALL
cartRouter.get("/:cid", passportCall('jwt'), authorization('user', 'vendor', 'admin'), carts.getCartById);

cartRouter.post("/:cid/product/:pid", passportCall('jwt'), carts.addProductFromCart);

cartRouter.delete("/:cid/product/:pid", passportCall('jwt'), carts.deleteProductFromCart);

cartRouter.put("/:cid/product/:pid", passportCall('jwt'), carts.updateProductCart);

cartRouter.put("/:cid", passportCall('jwt'), carts.updateCartById);

cartRouter.delete("/:cid", passportCall('jwt'), carts.deleteAllProductsFromCartById);

cartRouter.post('/purchase/:cid', passportCall('jwt'), carts.createPurchase);

export default cartRouter;


