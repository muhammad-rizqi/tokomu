import {api} from './global_var/api';

export const cartFromUser = (userId, token) => {
  return api('GET', '/user/cart/' + userId, null, token);
};

export const addCart = (productId, userId, qty, token) => {
  const body = {
    product_id: productId,
    user_id: userId,
    qty: qty,
  };

  return api('POST', '/user/cart', JSON.parse(body), token);
};

export const deleteCartItem = (cartId, token) => {
  return api('DELETE', '/user/cart/' + cartId, null, token);
};

export const updateCartItem = (cartId, qty, token) => {
  const body = {
    qty: qty,
  };
  return api('DELETE', '/user/cart/' + cartId, JSON.stringify(body), token);
};
