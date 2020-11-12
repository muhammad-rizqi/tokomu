import {getToken} from '../controller/Token';
import {api} from './global_var/api';
import {createFormData} from './helper';

const login = async (email, password) => {
  const body = {
    email: email,
    password: password,
  };

  return await api('POST', '/login', JSON.stringify(body));
};

const register = async (name, email, role, password, confirm) => {
  const body = {
    name: name,
    email: email,
    role: role,
    password: password,
    password_confirmation: confirm,
  };

  return await api('POST', '/register', body);
};

const getUserInfo = async () => {
  const token = await getToken();
  return await api('GET', '/getAuthenticatedUser', null, token);
};

const getUserDetail = async () => {
  const user = await getUserInfo();
  const token = await getToken();
  return await api('GET', `/user/${user.data.user.id}`, null, token);
};

const updateUserDetail = async (
  user_id,
  phone_number,
  address,
  avatar = null,
) => {
  const token = await getToken();
  const body = {
    user_id: user_id,
    phone_number: phone_number,
    address: address,
  };

  return await api(
    'POST',
    '/user/detail',
    avatar ? createFormData(avatar, 'avatar', body) : JSON.stringify(body),
    token,
    avatar ? true : false,
  );
};

export {login, register, getUserInfo, getUserDetail, updateUserDetail};
