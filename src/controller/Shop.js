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
  const user = await getUserInfo();
  return await api('GET', '/myshop/' + user.data.user.id);
};

const addShop = async (shopName, description, avatar, userId) => {
  const body = {
    shop_name: shopName,
    description: description,
    user_id: userId,
  };

  return await api('POST', '/shop', createFormData(avatar, 'image', body));
};

export {getShopList, getShop, getMyShop, addShop};
