import {api} from './global_var/api';
import {createFormData} from './helper';

export const getProductList = async () => {
  return await api('GET', '/product');
};

export const getProductDetail = async (productId) => {
  return await api('GET', `/product/${productId}`);
};

export const addProduct = async (
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

  return await api(
    'POST',
    '/product',
    createFormData(image, 'image', body),
    token,
    image ? true : false,
  );
};

export const updateProduct = async (
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

  return await api(
    'PATCH',
    '/product' + productId,
    createFormData(image, 'image', body),
    token,
    image ? true : false,
  );
};

export const deleteProduct = async (productId, token) => {
  return await api('DELETE', '/product' + productId, null, token);
};
