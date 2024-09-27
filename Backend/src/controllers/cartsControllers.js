import { cartsRepository, productsRepository } from "../repositories/index.js";
import CartDTO from "../dao/dto/CartDto.js";
import purchaseService from "../services/PurchaseService.js";
import productModel from "../dao/mongo/models/productModel.js";

export const getCarts = async (req, res) => {
  let carts = await cartsRepository.getCarts();
  const result = carts.map((cart) =>
    CartDTO.getCartResponseForRole(cart, "admin")
  );
  res
    .status(200)
    .json({ succes: true, data: result, message: "You have all the carts" });
};

// You must have permission to see the cart!!!
export const getCartById = async (req, res) => {
  const id = req.params.cid;
  const role = req.user.data.role;
  const userCartId = req.user.data.cartId;

  if (id != userCartId && role != "admin") {
    return res.status(403).json({
      succes: false,
      message: "You do not have permission to view the cart",
    });
  }

  let cart = await cartsRepository.getCartById(id);
  if (!cart) {
    return res.status(404).json({
      succes: false,
      message: "Cart not found",
    });
  }
  const result = CartDTO.getCartResponseForRole(cart, role);
  res
    .status(200)
    .json({ succes: true, data: result, message: "You have the cart" });
};

export const addProductFromCart = async (req, res) => {
  const idCart = req.params.cid;
  const idProduct = req.params.pid;
  const email = req.user.data.email;
  const userCartId = req.user.data.cartId;
  const role = req.user.data.role;

  if (role == "admin") {
    return res.status(403).json({
      succes: false,
      message: "As an administrator you cannot make operations in the cart",
    });
  }

  if (idCart != userCartId) {
    return res.status(403).json({
      succes: false,
      message: "You do not have permission to view the cart",
    });
  }

  const cart = await cartsRepository.getCartById(idCart);

  if (!cart) {
    return res.status(404).json({
      succes: false,
      message: "Cart not found",
    });
  }

  const product = await productsRepository.getProductBy({ _id: idProduct });

  if (!product) {
    return res.status(404).json({
      succes: false,
      message: "Product not found",
    });
  }

  // Check if the product belongs to the user. If not, you can add it.
  if (product.owner === email) {
    return res.status(400).json({
      succes: false,
      message: "You cannot add your own products to your cart",
    });
  }

  // SUCCESS
  const result = await cartsRepository.addProductFromCart(idCart, idProduct);
  res.status(200).json({ success: true, data: result });
};

export const deleteAllProductsFromCartById = async (req, res) => {
  const cid = req.params.cid;
  const cart = await cartsRepository.getCartById(cid);
  const userCartId = req.user.data.cartId;

  if (cid != userCartId) {
    return res.status(403).json({
      succes: false,
      message: "You do not have permission to view the cart",
    });
  }

  if (!cart) {
    return res.status(404).json({
      succes: false,
      message: "Cart not found",
    });
  }

  if (cart.products.length == 0) {
    return res.status(400).json({
      succes: false,
      message: "There are not products in the cart",
    });
  }

  const result = await cartsRepository.deleteProductsCart(cid);
  res.status(200).json({ success: true, data: result });
};

export const deleteProductFromCart = async (req, res) => {
  const { cid, pid } = req.params;
  const userCartId = req.user.data.cartId;

  if (cid != userCartId) {
    return res.status(403).json({
      succes: false,
      message: "You do not have permission to view the cart",
    });
  }
  const cart = await cartsRepository.getCartById(cid);

  if (!cart) {
    return res.status(404).json({
      succes: false,
      message: "Cart not found",
    });
  }

  const product = await productsRepository.getProductBy({ _id: pid });

  if (!product) {
    return res.status(404).json({
      succes: false,
      message: "Product not found",
    });
  }

  const result = await cartsRepository.deleteProduct(cid, pid);
  res.status(200).json({ success: true, data: result });
};

export const updateCartById = async (req, res) => {
  const { products } = req.body;
  const { cid } = req.params;
  const userCartId = req.user.data.cartId;

  if (cid != userCartId) {
    return res.status(403).json({
      succes: false,
      message: "You do not have permission to view the cart",
    });
  }

  // Check Cart
  const cart = await cartsRepository.getCartById(cid);

  if (!cart) {
    return res.status(404).json({
      succes: false,
      message: "Cart not found",
    });
  }

  // VERIFY THAT THE PRODUCTS INTRODUCED WHEN UPDATE THE CART EXIST
  const productIds = products.map((product) => product.prodId);
  const foundProducts = await productModel.find({ _id: { $in: productIds } });

  const foundProductIds = foundProducts.map((product) =>
    product._id.toString()
  );

  const nonExistentProducts = products.filter(
    (product) => !foundProductIds.includes(product.prodId)
  );
  if (nonExistentProducts.length > 0) {
    return res.status(400).json({
      success: false,
      cause: "Some products do not exist",
      message: "The update was not performed",
      nonExistentProducts,
    });
  }

  // VERIFY THAT THE REQUESTED QUANTITY DOES NOT EXCEED THE STOCK
  const productsWithInsufficientStock = [];
  for (const product of products) {
    const foundProduct = foundProducts.find(
      (fp) => fp._id.toString() === product.prodId
    );
    if (foundProduct && product.quantity > foundProduct.stock) {
      productsWithInsufficientStock.push({
        prodId: product.prodId,
        requestedQuantity: product.quantity,
        availableStock: foundProduct.stock,
      });
    }
  }

  if (productsWithInsufficientStock.length > 0) {
    return res.status(400).json({
      success: false,
      message: "The update was not performed",
      cause: "Some products have insufficient stock",
      productsWithInsufficientStock,
    });
  }

  const result = await cartsRepository.updateProductsCart(cid, products);
  res.status(200).json({ success: true, data: result });
};

export const updateProductCart = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  const userCartId = req.user.data.cartId;

  if (cid != userCartId) {
    return res.status(403).json({
      succes: false,
      message: "You do not have permission to view the cart",
    });
  }

  const cart = await cartsRepository.getCartById(cid);

  if (!cart) {
    return res.status(404).json({
      succes: false,
      message: "Cart not found",
    });
  }

  const product = await productsRepository.getProductBy({ _id: pid });

  if (!product) {
    return res.status(404).json({
      succes: false,
      message: "Product not found",
    });
  }

  /**
   *
   * find the product in the cart. If the quantity of the bodysuit is the same as the quantity of the product in the cart, the update is not done.
   *
   */
  const cartProduct = cart.products.find((item) => {
    return item.prodId && item.prodId._id.toString() === pid;
  });

  if (!cartProduct) {
    return res.status(404).json({
      success: false,
      message: "Product not found in cart",
    });
  }

  // Check if the quantity is greater than the stock of the product
  if (quantity > product.stock) {
    return res.status(200).json({
      success: false,
      message: "the quantity is greater than the stock of the product.",
    });
  }
  if (cartProduct.quantity === quantity) {
    return res.status(200).json({
      success: false,
      message: "The quantity is the same, no changes were made.",
    });
  }

  const result = await cartsRepository.updateProduct(cid, pid, quantity);
  res.status(200).json({ success: true, data: result });
};

export const createPurchase = async (req, res) => {
  const cartId = req.params.cid;
  const userCartId = req.user.data.cartId;

  if (cartId != userCartId) {
    return res.status(403).json({
      succes: false,
      message: "You do not have permission to view the cart",
    });
  }

  const cart = await cartsRepository.getCartById(cartId);

  if (!cart) {
    return res.status(404).json({
      succes: false,
      message: "Cart not found",
    });
  }

  //If there are no products in the cart, the operation is not carried out.
  if (cart.products.length == 0) {
    return res.status(400).json({
      succes: false,
      message: "There are not products in the cart",
    });
  }
  const result = await purchaseService.createPurchase(cartId);
  res.status(200).json({ success: true, data: result });
};
