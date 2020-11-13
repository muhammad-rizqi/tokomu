import {api} from './global_var/api';
import {createFormData} from './helper';

const getShopList = async () => {
  return await api('GET', '/shop');
};

const getShop = async (id) => {
  return await api('GET', '/shop/' + id);
};

const getMyShop = async (userId, token) => {
  return await api('GET', '/myshop/' + userId, null, token);
};

const addShop = async (shopName, description, image, userId, token) => {
  const body = {
    user_id: userId,
    shop_name: shopName,
    description: description,
  };

  return await api(
    'POST',
    '/shop',
    image ? createFormData(image, 'image', body, token) : JSON.stringify(body),
    token,
    image ? true : false,
  );
};

const getProductByShop = (shopId, token) => {
    return await api(
    'GET',
    `/shop/${shopId}/products`,
    null,
    token
  );
}

export {getShopList, getShop, getMyShop, addShop, getProductByShop};
