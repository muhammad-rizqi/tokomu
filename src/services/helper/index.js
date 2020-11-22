import _ from 'lodash';

export const createFormData = (photo, fieldName, body) => {
  const data = new FormData();

  data.append(fieldName, {
    name: photo.fileName,
    type: photo.type,
    uri: photo.uri,
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

export const toPrice = (price) => {
  return _.replace(price, /\B(?=(\d{3})+(?!\d))/g, '.');
};
