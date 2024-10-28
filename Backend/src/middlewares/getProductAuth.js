import { productsRepository } from "../repositories/index.js";

export const getProductAuth = (...roles) => {
  return async (req, res, next) => {
    const { user } = req;
    const { pid } = req.params;

    // if (!roles.includes(user.role)) {
    //   return res.status(401).json({ message: 'Unauthorized' });
    // }
    const product = await productsRepository.getProductBy({ _id: pid })
    let isVisibleProduct = false
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (user.role === 'user') {
      isVisibleProduct = product.status === "sale"
      if (!isVisibleProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
    }

    if (user.role === 'vendor') {
      isVisibleProduct = product.owner === user.email
      if (!isVisibleProduct) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    }

    if (user.role === 'admin') {
      isVisibleProduct = true
    }

    req.product = product;
    req.isVisibleProduct = isVisibleProduct;
    next()
  }
}