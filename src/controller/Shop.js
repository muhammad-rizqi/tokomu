import {getToken} from '../controller/Token';
import {api} from './global_var/api';
import {createFormData} from './helper';
import {getUserInfo} from './User';

const getShopList = async () => {
  return await api('GET', '/shop');
};

const getShop = async (id) => {
  return await api('GET', '/shop/' + id);
};

const getMyShop = async () => {
  const token = await getToken();
  const user = await getUserInfo();
  return await api('GET', '/myshop/' + user.data.user.id, null, token);
};

const addShop = async (shopName, description, image) => {
  const token = await getToken();
  const user = await getUserInfo();
  const body = {
    shop_name: shopName,
    description: description,
    user_id: user.data.user.id,
  };

  return await api(
    'POST',
    '/shop',
    image ? createFormData(image, 'image', body, token) : JSON.stringify(body),
    token,
    image ? true : false,
  );
};

export {getShopList, getShop, getMyShop, addShop};
