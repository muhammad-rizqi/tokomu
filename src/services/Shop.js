import {api} from './global_var/api';
import {createFormData} from './helper';

const getShopList = () => {
  return api('GET', '/shop');
};

const getShop = (id) => {
  return api('GET', '/shop/' + id);
};

const getMyShop = (userId, token) => {
  return api('GET', '/myshop/' + userId, null, token);
};

const addShop = (shopName, description, image, userId, token) => {
  const body = {
    user_id: userId,
    shop_name: shopName,
    description: description,
  };

  return api(
    'POST',
    '/shop',
    image ? createFormData(image, 'image', body, token) : JSON.stringify(body),
    token,
    image ? true : false,
  );
};

const getProductByShop = (shopId, token) => {
  return api('GET', `/shop/${shopId}/products`, null, token);
};

export const getShopTransaction = (shopId, token) => {
  return api('GET', `/shop/${shopId}/transaction`, null, token);
};

export {getShopList, getShop, getMyShop, addShop, getProductByShop};
