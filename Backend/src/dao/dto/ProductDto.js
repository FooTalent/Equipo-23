
export default class ProductDTO {
  constructor() {}
  static getProductResponseForRole = (product, role, email) => {
    if (email == product.owner) {
      role = "authorized";
    }
    switch (role) {
      case "admin":
      case "authorized":
        return {
          id: product._id,
          title: product.title,
          description: product.description,
          code: product.code,
          price: product.price,
          status: product.status,
          stock: product.stock,
          category: product.category,
          owner: product.owner,
          thumbnails: product.thumbnails,
          created_data:product.createdAt,
          update_data: product.updatedAt,
        };
      default:
        return {
          id: product._id,
          title: product.title,
          description: product.description,
          price: product.price,
          status: product.status,
          stock: product.stock,
          category: product.category,
          owner: product.owner,
          thumbnails: product.thumbnails,
          created_data:product.createdAt,
        };
    }
  };
}
