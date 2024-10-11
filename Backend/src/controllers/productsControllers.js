import { cartsRepository, productsRepository } from "../repositories/index.js";
import ProductDTO from "../dao/dto/ProductDto.js";
import config from "../config/config.js";
import { transport } from "../utils/nodemailer.js";
import { removeEmptyObjectFields } from "../utils/removeEmptyObjectFields.js";
import uploadFile from "../utils/cloudinary/upload.js";
/**
 *
 * PERMISSIONS endpoint ¡¡create!!:
 *  admin
 *  vendor
 */
export const createProduct = async (req, res) => {
  const { title, description, code, price, stock, category } = req.body;
  const role = req.user.data.role;
  const email = req.user.data.email;
  /**
   * IMAGES PRODUCT !!
   */
  if (req.files.length == 0)
    return res.status(400).json({
      success: false,
      message: "Product image/images need to be uploaded",
    });

  /**
   * Verify if code exists
   * */

  // Verificación si el código ya existe
  const query = { code, owner: email };
  const existingProduct = await productsRepository.getProductBy(query);

  if (existingProduct && existingProduct.owner == req.user.data.email) {
    return res
      .status(404)
      .json({ success: false, message: "Product with code already exists" });
  }
  const uploadedImages = await uploadFile(
    req.files,
    `minegocio/${req.user.data._id}/products`,
    {}
  );

  if (uploadedImages.length == 0) {
    return res.status(400).json({
      success: false,
      message: "Product image/images need to be uploaded",
    });
  }

  const thumbnailsSerialize = uploadedImages.map((img) => {
    return {
      name: img.display_name,
      reference: img.url,
    };
  });

  // IF CODE NOT EXISTS
  let owner = "admin";
  if (role == "vendor") owner = email;
  console.log("products images ", thumbnailsSerialize);
  const result = await productsRepository.createProduct({
    title,
    description,
    code,
    price,
    stock,
    category,
    owner,
    thumbnails: thumbnailsSerialize,
  });
  const productDto = ProductDTO.getProductResponseForRole(result[0], "admin");

  res.status(201).json({ success: true, data: productDto });
};

export const getProducts = async (req, res) => {
  let { limit, page, sort, query } = req.query;

  // Optional chaining is used because the user may not be authenticated !!
  const role = req.user?.data?.role;
  const email = req.user?.data?.email;

  let result = await productsRepository.getProducts(
    email,
    limit,
    page,
    sort,
    query
  );
  const products = result.data.map((prod) =>
    ProductDTO.getProductResponseForRole(prod, role, email)
  );
  result.data = products;

  res.status(200).json({ succes: true, data: result });
};

export const getProductById = async (req, res) => {
  const id = req.params.pid;

  // Optional chaining is used because the user may not be authenticated !!
  const role = req.user?.data?.role;
  const email = req.user?.data?.email;

  const product = await productsRepository.getProductBy({ _id: id });
  if (!product) {
    return res
      .status(404)
      .json({ succes: false, message: "Product not found" });
  }

  const productDto = ProductDTO.getProductResponseForRole(product, role, email);
  res.status(201).json({ success: true, data: productDto });
};

export const deleteProductById = async (req, res) => {
  const id = req.params.pid;
  const email = req.user.data.email;
  const role = req.user.data.role;

  const product = await productsRepository.getProductBy({ _id: id });
  if (!product) {
    return res
      .status(404)
      .json({ succes: false, message: "Product not found" });
  }

  //verified permission
  if (role == "vendor" && email != product.owner) {
    return res.status(200).json({
      succes: false,
      message: "You do not have permission to delete the product",
    });
  }

  // If the product to be deleted is found a cart is DELETED
  await cartsRepository.removeDeletedProductsFromcart(id);

  /**
   *
   *  Product removed by the -- OWNER --
   *  Send email notification about product removal to the owner
   */
  if (role == "vendor" && email == product.owner) {
    const result = await productsRepository.deleteProductBy({ _id: id });
    return res.status(200).json({
      succes: true,
      data: result,
      message: "Product deleted by owner",
    });
  }

  /**
   *
   *  Product removed by the -- ADMIN --
   *  Send email notification about product removal to the owner
   */

  if (role == "admin") {
    const result = await productsRepository.deleteProductBy({ _id: id });

    // Verify if owners' product
    if (product.owner != "admin") {
      await transport.sendMail({
        from: `E-commerce Coder<${config.correoGmail}>`,
        to: product.owner,
        subject: "producto eliminado",
        html: `
            <div>
                <p>Tu producto fue eliminado.</p>
            </div>
            `,
        attachments: [],
      });
    }
    res.status(200).json({
      succes: true,
      data: result,
      message: "Product deleted by admin",
    });
  }
};

export const updateProductById = async (req, res) => {
  const id = req.params.pid;
  const email = req.user?.data?.email;
  const role = req.user?.data?.role;
  const { title, description, code, price, stock, category, thumbnail } =
    req.body;

  if (req.body._id || req.body.owner) {
    return res
      .status(400)
      .json({ succes: false, message: "Cannot edit id field" });
  }

  const product = await productsRepository.getProductBy({ _id: id });
  if (!product) {
    return res
      .status(404)
      .json({ succes: false, message: "Product not found" });
  }

  /**
   * Check permissions !!
   * Only the creator of the product can update it
   *
   */
  if (role === "vendor" && product.owner !== email) {
    return res.status(403).json({
      success: false,
      message: "You do not have permission to update this product",
    });
  }
  /**
   *
   * Check if the product code already exists except yours
   *
   * */
  const query = { code, _id: { $ne: id } };
  const exists = await productsRepository.getProductBy(query);

  if (exists) {
    return res
      .status(404)
      .json({ success: false, message: "Product with code already exists" });
  }

  // Removed empty fields
  removeEmptyObjectFields({
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnail,
  });

  const result = await productsRepository.updateProductBy(
    { _id: id },
    { title, description, code, price, stock, category, thumbnail }
  );
  res.status(200).json({ succes: true, data: result });
};

export const searchProducts = async (req, res) => {
  const { search, limit, page, sort } = req.query;
  const result = await productsRepository.getProductBy({ title: search });
  res.status(200).json({ succes: true, data: result });
};

export const uploadProductImages = async (req, res) => {
  const productId = req.params.pid;
  const images = req.files || [];

  //Verify if exists products and images in req.
  if (images.length === 0) {
    return res
      .status(400)
      .json({ message: "No se subieron imágenes de producto." });
  }

  const product = await productsRepository.getProductBy({ _id: productId });
  if (!product) {
    res.status(404).json({ succes: false, message: "Product not found" });
  }

  // Check permissions
  // Only the creator of the product can upload images
  if (product.owner !== email) {
    return res.status(403).json({
      success: false,
      message: "You do not have permission to upload images to this product",
    });
  }

  //--------------- UPLOAD -----------------
  const imageReferences = images.map((image) => ({
    name: image.originalname,
    reference: `/img/products/${image.filename}`,
  }));

  const updateData = {
    $push: {
      thumbnails: {
        $each: imageReferences,
      },
    },
  };

  const result = await productsRepository.updateProductBy(
    { _id: pid },
    updateData
  );
  res.status(200).json({
    succes: true,
    data: result,
    message: `Se subieron ${images.length} imágenes de producto.`,
  });
};
