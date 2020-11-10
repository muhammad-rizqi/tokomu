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

export {login};
