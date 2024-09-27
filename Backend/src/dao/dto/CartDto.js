import ProductDTO from "./ProductDto.js";

export default class CartDTO {
  constructor() {
  }

  static getCartResponseForRole = (cart, role) => {
    if (role === "admin" || role === "premium" || role === "user") {
      return {
        id: cart._id,
        products:
          cart.products.length > 0
            ? cart.products.map((prod) =>({
              product:ProductDTO.getProductResponseForRole(prod.prodId, role),
              quantity: prod.quantity,
              price:prod.price
            })
              )
            : "No hay productos",
        totalPrice: cart.totalPrice
      };
    }
  };
}
