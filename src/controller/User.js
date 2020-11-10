import {storeToken, removeToken} from '../controller/Token';

const login = async (email, password) => {
  const data = await fetch('http://tokomu.herokuapp.com/api/login', {
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
  const data = await fetch('http://tokomu.herokuapp.com/api/register', {
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

export {login, register};
