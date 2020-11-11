import {storeToken, removeToken, getToken} from '../controller/Token';
import {host} from './global_var/api';

const login = async (email, password) => {
  const data = await fetch(host + '/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.token) {
        storeToken(json.token);
      } else {
        removeToken();
      }
      return json;
    })
    .catch((error) => {
      return error;
    });
  return data;
};

const register = async (name, email, role, password, confirm) => {
  const data = await fetch(host + '/register', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      email: email,
      role: role,
      password: password,
      password_confirmation: confirm,
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      return error;
    });
  return data;
};

const getUserInfo = async () => {
  const token = await getToken();
  const data = await fetch(host + '/getAuthenticatedUser', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      return error;
    });
  return data;
};

const getUserDetail = async () => {
  const user = await getUserInfo();
  const token = await getToken();
  const data = await fetch(host + '/user/' + user.data.user.id, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      return error;
    });
  return data;
};

export {login, register, getUserInfo, getUserDetail};
