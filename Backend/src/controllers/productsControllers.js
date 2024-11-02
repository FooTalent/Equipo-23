import { cartsRepository, productsRepository } from "../repositories/index.js";
import ProductDTO from "../dao/dto/ProductDto.js";
import config from "../config/config.js";
import { transport } from "../utils/nodemailer.js";
import { removeEmptyObjectFields } from "../utils/removeEmptyObjectFields.js";
import uploadFile from "../utils/cloudinary/upload.js";
import { deleteSources } from "../utils/cloudinary/deleteFiles.js";

export const createProduct = async (req, res) => {
  const { title, description, code, price, stock, category, status } = req.body;
  const role = req.user.data.role;
  const email = req.user.data.email;
  if (req.files.length == 0)
    return res.status(400).json({
      success: false,
      message: "Product image/images need to be uploaded",
    });


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

  let owner = "admin";
  if (role == "vendor") owner = email;
  const result = await productsRepository.createProduct({
    title,
    description,
    code,
    price,
    stock,
    category,
    status,
    owner,
    thumbnails: thumbnailsSerialize,
  });
  const productDto = ProductDTO.getProductResponseForRole(result[0], "admin");

  res.status(201).json({ success: true, data: productDto });
};

export const getProducts = async (req, res) => {
  let { limit, page, sort, query } = req.query;

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

  const role = req.user?.data?.role;
  const product = req.product
  const isVisibleProduct = req.isVisibleProduct

  console.log("isVisibleProduct", isVisibleProduct)

  if (!isVisibleProduct) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  const productDto = ProductDTO.getProductResponseForRole(product, role);


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

  if (role == "vendor" && email != product.owner) {
    return res.status(200).json({
      succes: false,
      message: "You do not have permission to delete the product",
    });
  }

  await cartsRepository.removeDeletedProductsFromcart(id);

  if (role == "vendor" && email == product.owner) {
    const result = await productsRepository.deleteProductBy({ _id: id });
    return res.status(200).json({
      succes: true,
      data: result,
      message: "Product deleted by owner",
    });
  }

  if (role == "admin") {
    const result = await productsRepository.deleteProductBy({ _id: id });

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
  const { title, description, code, price, thumbnail, stock, category, status } =
    req.body;

  const images = req.files || [];
  console.log("images", images);
  console.log("thumbnail", thumbnail);
  console.log("req.body", req.body);
  console.log("req.files", req.files);
  console.log("req.body.thumbnail", req.body.thumbnail);

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


  if (role === "vendor" && product.owner !== email) {
    return res.status(403).json({
      success: false,
      message: "You do not have permission to update this product",
    });
  }

  const query = { code, _id: { $ne: id } };
  const exists = await productsRepository.getProductBy(query);
  if (exists) {
    return res
      .status(404)
      .json({ success: false, message: "Product with code already exists" });
  }

  if (images.length > 0) {
    const uploadedImages = await uploadFile(
      images,
      `minegocio/${req.user.data._id}/products`,
      {}
    );
    const thumbnailsSerialize = uploadedImages.map((img) => {
      return {
        name: img.display_name,
        reference: img.url,
      };
    });
    req.body.thumbnails = thumbnailsSerialize;
  }

  const thumbnailsSerialize = [...product.thumbnails, ...req.body.thumbnails];


  removeEmptyObjectFields({
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnailsSerialize,
  });

  const result = await productsRepository.updateProductBy(
    { _id: id },
    { title, description, code, price, stock, category, thumbnail, status }
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


  if (images.length === 0) {
    return res
      .status(400)
      .json({ message: "No se subieron imágenes de producto." });
  }

  const product = await productsRepository.getProductBy({ _id: productId });
  if (!product) {
    res.status(404).json({ succes: false, message: "Product not found" });
  }


  if (product.owner !== email) {
    return res.status(403).json({
      success: false,
      message: "You do not have permission to upload images to this product",
    });
  }

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

export const updateProductImages = async (req, res) => {
  const product = req.product;
  const user = req.user.data;
  const imagesNew = req.files || [];
  const imagesForUpdate = JSON.parse(req.body.imagesForUpdate) || [];

  if (imagesNew.length === 0 && imagesForUpdate.length === 0) {
    return res
      .status(400)
      .json({ message: "No se subieron imágenes de producto." });
  }

  if (imagesNew.length !== imagesForUpdate.length) {
    return res
      .status(400)
      .json({ message: "La cantidad de imágenes no coincide." });
  }

  const imagesPrduct = product.thumbnails.map(element => element.reference)

  for (let i = 1; i < imagesForUpdate.length; i++) {
    if (!imagesPrduct.includes(imagesForUpdate[i])) {
      return res
        .status(400)
        .json({ message: "La imagen no pertenece al producto." });
    }
  }

  const uploadedImages = await uploadFile(
    imagesNew,
    `minegocio/${user._id}/products`,
    {}
  );
  const regex = /v\d+\/(.+)\.(jpg|svg|png|gif|mp4|webm)$/

  const imagesIdCloudinary = imagesForUpdate.map((img) => {
    const match = img.match(regex);
    return match ? match[1] : null;
  })

  imagesIdCloudinary.map(async (id) => {
    await deleteSources(id);
  });

  const thumbnailsSerialize = uploadedImages.map((img) => {
    return {
      name: img.display_name,
      reference: img.url,
    };
  });

  thumbnailsSerialize.concat(imagesForUpdate.filter(img => !imagesForUpdate.includes(img)))

  const updateData = {
    $set: {
      thumbnails: thumbnailsSerialize,
    },
  };
  const result = await productsRepository.updateProductBy(
    { _id: product._id },
    updateData
  );

  return res.status(200).json({
    succes: true,
    data: result,
    message: `Se subieron ${imagesNew.length} imágenes de producto.`,
  });
};
