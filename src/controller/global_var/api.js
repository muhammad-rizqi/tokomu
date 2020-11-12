export const host = 'http://tokomu.herokuapp.com/api';

export const api = async (
  method,
  path,
  body = null,
  token = null,
  file = null,
) => {
  const headers = file
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

  const data = await fetch(host + path, {
    method: method,
    headers: headers,
    body: body,
  }).then((response) => response.json());

  return data;
};
