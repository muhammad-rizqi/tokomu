import {api} from './global_var/api';
import {createFormData} from './helper';

export const getProductList = () => {
  return api('GET', '/product');
};

export const getProductDetail = (productId) => {
  return api('GET', `/product/${productId}`);
};

export const addProduct = (
  productName,
  description,
  price,
  stock,
  image,
  categoryId,
  shopId,
  token,
) => {
  const body = {
    product_name: productName,
    description: description,
    price: price,
    stock: stock,
    category_id: categoryId,
    shop_id: shopId,
  };

  return api(
    'POST',
    '/product',
    createFormData(image, 'image', body),
    token,
    image ? true : false,
  );
};

export const updateProduct = (
  productId,
  productName,
  description,
  price,
  stock,
  image,
  categoryId,
  token,
) => {
  const body = {
    product_name: productName,
    description: description,
    price: price,
    stock: stock,
    category_id: categoryId,
  };

  return api(
    'PATCH',
    '/product' + productId,
    createFormData(image, 'image', body),
    token,
    image ? true : false,
  );
};

export const deleteProduct = (productId, token) => {
  return api('DELETE', '/product' + productId, null, token);
};
