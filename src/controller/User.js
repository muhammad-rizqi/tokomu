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

  return await api('POST', '/register', JSON.stringify(body));
};

const getUserInfo = async (token) => {
  return await api('GET', '/getAuthenticatedUser', null, token);
};

const getUserDetail = async (id, token) => {
  return await api('GET', `/user/${id}`, null, token);
};

const updateUserDetail = async (
  user_id,
  phone_number,
  address,
  avatar = null,
  token,
) => {
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
