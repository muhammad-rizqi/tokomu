import {clearToken} from '../../redux/action';
import store from '../../redux/store';
import {removeToken} from '../Token';

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
  })
    .then((response) => response.json())
    .then((resJson) => {
      if (
        resJson.status === 'Token is Expired!' ||
        resJson.status === 'Token is Invalid!'
      ) {
        removeToken().then(() => store.dispatch(clearToken()));
      } else {
        return resJson;
      }
    });

  return data;
};
