import {api} from './global_var/api';
import {createFormData} from './helper';

const login = (email, password) => {
  const body = {
    email: email,
    password: password,
  };

  return api('POST', '/login', JSON.stringify(body));
};

const register = (name, email, role, password, confirm) => {
  const body = {
    name: name,
    email: email,
    role: role,
    password: password,
    password_confirmation: confirm,
  };

  return api('POST', '/register', JSON.stringify(body));
};

const getUserInfo = (token) => {
  return api('GET', '/getAuthenticatedUser', null, token);
};

const getUserDetail = (id, token) => {
  return api('GET', `/user/${id}`, null, token);
};

const updateUserDetail = (
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

  return api(
    'POST',
    '/user/detail',
    avatar ? createFormData(avatar, 'avatar', body) : JSON.stringify(body),
    token,
    avatar ? true : false,
  );
};

export const updateUser = (userId, name, email, token) => {
  const body = {
    name: name,
    email: email,
  };

  return api('POST', '/user/update/' + userId, JSON.stringify(body), token);
};

export const updatePassword = (
  userId,
  oldPassword,
  newPassword,
  confirmPassword,
  token,
) => {
  const body = {
    _method: 'PATCH',
    old_password: oldPassword,
    password: newPassword,
    password_confirmation: confirmPassword,
  };

  return api('POST', '/user/password/' + userId, JSON.stringify(body), token);
};

export const deleteUser = (userId, password, token) => {
  const body = {
    user_id: userId,
    password: password,
  };

  return api('POST', '/user/delete/', JSON.stringify(body), token);
};

export {login, register, getUserInfo, getUserDetail, updateUserDetail};
