import config from "../config/config.js";
import { productsRepository, cartsRepository } from "../repositories/index.js";

export const viewHome = (req, res) => {
  let user = req.user?.data || null;
  if (user) {
    res.render("index", {
      notUser: false,
    });
  } else {
    res.render("index", {
      notUser: true,
    });
  }
};
export const viewRegister = (req, res) => {
  res.render("register", {});
};
export const viewLogin = (req, res) => {
  res.render("login", {});
};

export const viewProfile = (req, res) => {
  if (!req.user) {
    return;
  }
  const userData = req.user;
  let sinFoto = false;
  if (userData.data.profilePhoto.name == "Sin foto de perfil") {
    sinFoto = true;
  }
  res.render("profile", {
    userFirstName: userData.data.first_name,
    userLastName: userData.data.last_name,
    userAge: userData.data.age,
    userEmail: userData.data.email,
    userProfilePhoto: userData.data.profilePhoto.reference,
    sinFoto: sinFoto,
    userRole: userData.data.role,
  });
};

const environment = config.environment;

export const viewProducts = async (req, res) => {
  const appUrl =
    environment === "development"
      ? `${config.AppUrl}:${config.port}`
      : ``;

  let { limit = 10, page = 1, sort, query } = req.query;
  page = parseInt(page);

  let usernameUser;
  let admin;

  const user = req.user?.data || null;
  if (user && user.role == "admin") {
    admin = true;
  }

  const response = await productsRepository.getProducts(
    limit,
    page,
    sort,
    query
  );

  const { data, hasNextPage, hasPrevPage } = response;

  const products = data.map((doc) => doc.toObject());

  const nextPageLink = hasNextPage
    ? `${appUrl}/products?limit=${limit}&page=${
        page + 1
      }&sort=${sort}`
    : null;
  const prevPageLink = hasPrevPage
    ? `${appUrl}/products?limit=${limit}&page=${
        page - 1
      }&sort=${sort}`
    : null;

  res.render("products", {
    products,
    existsNextPage: hasNextPage,
    existsPrevPage: hasPrevPage,
    nextLink: nextPageLink,
    prevLink: prevPageLink,
    usernameUser,
    admin,
  });
};

export const viewProductById = async (req, res) => {
  const { pid } = req.params;
  const product = await productsRepository.getProductLeanBy({ _id: pid });
  let user = req.user?.data || null;
  let isAdmin;
  if (user) {
    isAdmin = user.role == "admin";
  }
  let authorized = user && !isAdmin;

  res.render("product", {
    productId: pid,
    product,
    authorized,
  });
};
export const viewCartById = async (req, res) => {
  const id = req.params.cid;
  const cartData = await cartsRepository.getCartById(id);
  let purchaseAvailable = false;
  if (cartData.products.length > 0) {
    purchaseAvailable = true;
  }
  res.render("cart", {
    cartId: id,
    cart: cartData.products,
    purchaseAvailable: purchaseAvailable,
    totalPrice: cartData.totalPrice,
  });
};

export const resetPassword = (req, res) => {
  res.render("resetPassword", {});
};

export const sendEmailForgetPassword = (req, res) => {
  res.render("sendEmailForgetPassword", {});
};
export const notAvailable = (req, res) => {
  res.render("not-available", {});
};

export const createProduct = (req, res) => {
  res.render("createProduct", {});
};

export const changeRole = (req, res) => {
  res.render("changeRole", {});
};

export const userRegistrationCode = (req, res) => {
  res.render("userRegistrationCode", {});
};
