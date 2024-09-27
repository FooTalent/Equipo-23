// import moment from "moment";

// const formatDate = (date) => {
//   return moment(date).format("DD/MM/YYYY HH:mm:ss");
// };

export default class ProductDTO {
  constructor() {}
  static getProductResponseForRole = (product, role, email) => {
    if (email == product.owner) {
      role = "authorized";
    }
    const status = product.stock > 0;
    switch (role) {
      case "admin":
      case "authorized":
        return {
          id: product._id,
          title: product.title,
          description: product.description,
          code: product.code,
          price: product.price,
          status,
          stock: product.stock,
          category: product.category,
          owner: product.owner,
          thumbnails: product.thumbnails,
          // created_data: formatDate(product.createdAt),
          // update_data: formatDate(product.updatedAt),
          created_data:product.createdAt,
          update_data: product.updatedAt,
        };
      default:
        return {
          id: product._id,
          title: product.title,
          description: product.description,
          price: product.price,
          status,
          stock: product.stock,
          category: product.category,
          owner: product.owner,
          thumbnails: product.thumbnails,
          // created_data: formatDate(product.createdAt),
          created_data:product.createdAt,
        };
    }
  };
}
