export const host = 'https://tokomu.herokuapp.com/api';
export const hostWeb = 'https://tokomu.herokuapp.com';

export const api = (method, path, body = null, token = null, file = null) => {
  const headers = file
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

  const data = fetch(host + path, {
    method: method,
    headers: headers,
    body: body,
  }).then((response) => response.json());

  return data;
};
