import moment from "moment";
import { cartsRepository } from "../../repositories/index.js";
import CartDTO from "./CartDto.js";

const formatDate = (date) => {
  return moment(date).format("DD/MM/YYYY HH:mm:ss");
};

export default class UserDTO {
  static getUserTokenFrom = (user) => {
    return {
      name: `${user.first_name} ${user.last_name}`,
      role: user.role,
      email: user.email,
      profilePhoto: user.profilePhoto.reference,
    };
  };

  static getUserResponseForRole = async (user, role, email) => {
    if (user.email == email) role = "authorized";
    const cart = await cartsRepository.getCartById(user.cartId);
    switch (role) {
      case "admin":
      case "authorized":
        return {
          id: user._id,
          name: `${user.first_name} ${user.last_name}`,
          age: user.age,
          email: user.email,
          profilePhoto: user.profilePhoto.reference,
          role: user.role,
          cart: cart,
          last_connection: formatDate(user.last_connection),
          isOnline: user.isOnline,
          documents:
            user.documents.length > 0
              ? user.documents.map((doc) => ({
                  name: doc.name,
                  reference: doc.reference,
                }))
              : "No hay documentos",
          created_data: formatDate(user.createdAt),
          updated_data: formatDate(user.updatedAt),
        };
      case "premium":
        return {
          id: user._id,
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          profilePhoto: user.profilePhoto.reference,
          last_connection: formatDate(user.last_connection),
          isOnline: user.isOnline,
          role: user.role,
          created_data: formatDate(user.createdAt),
        };
      case "user":
        return {
          id: user._id,
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          profilePhoto: user.profilePhoto.reference,
          last_connection: formatDate(user.last_connection),
          isOnline: user.isOnline,
          created_data: formatDate(user.createdAt),
        };
      default:
        return {
          id: user._id,
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          profilePhoto: user.profilePhoto.reference,
          role: user.role,
          created_data: formatDate(user.createdAt),
        };
    }
  };

  static getUserResponseForCurrent = async (user) => {
    const cart = await cartsRepository.getCartById(user.cartId);
    return {
      id: user._id,
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      profilePhoto:
        user.profilePhoto.reference || user.profilePhoto[0].reference,
      role: user.role,
      last_connection: formatDate(user.last_connection),
      isOnline: user.isOnline,
      cart: CartDTO.getCartResponseForRole(cart, user.role),
      documents:
        user.documents.length > 0
          ? user.documents.map((doc) => ({
              name: doc.name,
              reference: doc.reference,
            }))
          : "No hay documentos",
      created_data: formatDate(user.createdAt),
      updated_data: formatDate(user.updatedAt),
    };
  };
}
