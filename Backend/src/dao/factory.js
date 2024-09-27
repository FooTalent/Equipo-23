import { connnectDB } from "../utils/mongo.js";
import config from "../config/config.js";

export let Product;
export let Cart;
export let User;
export let Ticket;

switch (config.persistence) {
  case "MONGO":
    connnectDB();
    const { default: ProductMongo } = await import("./mongo/ProductMongo.js");
    const { default: CartMongo } = await import("./mongo/CartMongo.js");
    const { default: UserMongo } = await import("./mongo/UserMongo.js");
    const { default: TicketMongo } = await import("./mongo/TicketMongo.js");
    Product = ProductMongo;
    Cart = CartMongo;
    User = UserMongo;
    Ticket = TicketMongo
    break;
  default:
    throw new Error("Invalid persistence option");
}
