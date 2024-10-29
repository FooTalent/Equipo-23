import { productsRepository } from "../repositories";

export const productIsMine = async (req, res, next) => {
  const idProduct = req.params.pid;
  const email = req.user.data.email;

  const product = await productsRepository.getProductBy({
    _id: idProduct,
    owner: email,
  });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  req.product = product;
  next()
}