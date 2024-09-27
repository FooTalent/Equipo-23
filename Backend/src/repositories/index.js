import {Product} from "../dao/factory.js"
import {Cart} from "../dao/factory.js"
import {User} from "../dao/factory.js"
import {Ticket} from '../dao/factory.js'

import ProductRepository from "./ProductRepository.js"
import CartRepository from "./CartRepository.js"
import UserRepository from "./UserRepository.js"
import TicketRepository from './TicketRepository.js'

export const productsRepository =  new ProductRepository(new Product());
export const cartsRepository =  new CartRepository(new Cart());
export const usersRepository =  new UserRepository(new User());
export const ticketRepository =  new TicketRepository(new Ticket());