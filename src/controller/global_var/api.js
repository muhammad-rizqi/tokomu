export const host = 'http://tokomu.herokuapp.com/api';

export const api = async (method, path, body = null, token = null) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const data = await fetch(host + path, {
    method: method,
    headers: headers,
    body: body,
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    });
  return data;
};
