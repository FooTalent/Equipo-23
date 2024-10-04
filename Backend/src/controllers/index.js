import * as productsControllers from './productsControllers.js';
import * as usersControllers from './usersControllers.js';
import * as sessionsControllers from './sessionsControllers.js';
import * as cartsControllers from './cartsControllers.js';
import * as viewsControllers from './viewsControllers.js';
import * as ticketsControllers from './ticketsControllers.js'
import * as evolutionControllers from './evolutionControllers.js'
// import * as socketControllers from './socketControllers.js';

import { catchedAsync } from '../utils/catchedAsync.js';

const wrapAsyncFunctions = (controller) => {
  const wrappedController = {};
  for (const [key, value] of Object.entries(controller)) {
    if (typeof value === 'function') {
      wrappedController[key] = catchedAsync(value);
    } else {
      wrappedController[key] = value;
    }
  }
  return wrappedController;
};

export const products = wrapAsyncFunctions(productsControllers);
export const users = wrapAsyncFunctions(usersControllers);
export const sessions = wrapAsyncFunctions(sessionsControllers);
export const carts = wrapAsyncFunctions(cartsControllers);
export const views = wrapAsyncFunctions(viewsControllers);
export const tickets = wrapAsyncFunctions(ticketsControllers);
export const evolution = wrapAsyncFunctions(evolutionControllers);
// export const socket = wrapAsyncFunctions(socketControllers);