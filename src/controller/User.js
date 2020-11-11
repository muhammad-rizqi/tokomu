import {getToken} from '../controller/Token';
import {api} from './global_var/api';

const login = async (email, password) => {
  const body = {
    email: email,
    password: password,
  };

  const data = await api('POST', '/login', JSON.stringify(body));

  return data;
};

const register = async (name, email, role, password, confirm) => {
  const body = {
    name: name,
    email: email,
    role: role,
    password: password,
    password_confirmation: confirm,
  };

  const data = await api('POST', '/register', body);
  return data;
};

const getUserInfo = async () => {
  const token = await getToken();
  const data = await api('GET', '/getAuthenticatedUser', null, token);
  return data;
};

const getUserDetail = async () => {
  const user = await getUserInfo();
  const token = await getToken();
  const data = await api('GET', `/user/${user.data.user.id}`, null, token);
  return data;
};

const updateUserDetail = async (user_id, phone_number, address) => {
  const token = await getToken();
  const body = {
    user_id: user_id,
    phone_number: phone_number,
    address: address,
  };

  const data = await api('POST', '/user/detail', JSON.stringify(body), token);
  return data;
};

export {login, register, getUserInfo, getUserDetail, updateUserDetail};
