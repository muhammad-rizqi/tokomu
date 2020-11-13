import {api} from './global_var/api';

export const cartFromUser = async (userId, token) => {
  return await api('GET', '/user/cart/' + userId, null, token);
};

export const addCart = async (productId, userId, qty, token) => {
  const body = {
    product_id: productId,
    user_id: userId,
    qty: qty,
  };

  return await api('POST', '/user/cart', JSON.parse(body), token);
};

export const deleteCartItem = async (cartId, token) => {
  return await api('DELETE', '/user/cart/' + cartId, null, token);
};

export const updateCartItem = async (cartId, qty, token) => {
  const body = {
    qty: qty,
  };
  return await api(
    'DELETE',
    '/user/cart/' + cartId,
    JSON.stringify(body),
    token,
  );
};
