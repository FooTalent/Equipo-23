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
          name: user.name,
          suername: user.suername,
          age: user.age,
          phone: user.phone,
          email: user.email,
          country: user.country,
          locality: user.locality,
          photo: user.photo,
          role: user.role,
          cart: cart,
          last_connection: formatDate(user.last_connection),
          isOnline: user.isOnline,
          documents:
            user?.documents?.length > 0
              ? user.documents.map((doc) => ({
                name: doc.name,
                reference: doc.reference,
              }))
              : "No hay documentos",
          created_data: formatDate(user.createdAt),
          updated_data: formatDate(user.updatedAt),
        };
      case "vendor":
        return {
          id: user._id,
          name: user.name,
          suername: user.suername,
          age: user.age,
          phone: user.phone,
          email: user.email,
          country: user.country,
          locality: user.locality,
          photo: user.photo,
          role: user.role,
          last_connection: formatDate(user.last_connection),
          isOnline: user.isOnline,
          documents:
            user?.documents?.length > 0
              ? user.documents.map((doc) => ({
                name: doc.name,
                reference: doc.reference,
              }))
              : "No hay documentos",
        };
      case "user":
        return {
          id: user._id,
          name: user.name,
          suername: user.suername,
          age: user.age,
          phone: user.phone,
          email: user.email,
          country: user.country,
          locality: user.locality,
          photo: user.photo,
          role: user.role,
          last_connection: formatDate(user.last_connection),
          isOnline: user.isOnline,
          documents:
            user?.documents?.length > 0
              ? user.documents.map((doc) => ({
                name: doc.name,
                reference: doc.reference,
              }))
              : "No hay documentos",
        };
      default:
        return {
          id: user._id,
          name: user.name,
          suername: user.suername,
          age: user.age,
          phone: user.phone,
          email: user.email,
          country: user.country,
          locality: user.locality,
          photo: user.photo,
          role: user.role,
          last_connection: formatDate(user.last_connection),
          isOnline: user.isOnline,
          documents:
            user?.documents?.length > 0
              ? user.documents.map((doc) => ({
                name: doc.name,
                reference: doc.reference,
              }))
              : "No hay documentos",
        };
    }
  };

  static getUserResponseForCurrent = async (user) => {
    const cart = await cartsRepository.getCartById(user.cartId);
    return {
      id: user._id,
      name: user.name,
      last_name: user.lastName,
      age: user.age,
      phone: user.phone,
      email: user.email,
      country: user.country,
      postal_code: user.postal_code,
      locality: user.locality,
      photo: user.photo,
      role: user.role,
      last_connection: formatDate(user.last_connection),
      isOnline: user.isOnline,
      documents:
        user?.documents?.length > 0
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
