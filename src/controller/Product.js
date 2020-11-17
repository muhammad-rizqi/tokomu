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
    image ? createFormData(image, 'image', body) : JSON.stringify(body),
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
  image = null,
  categoryId,
  token,
) => {
  const body = {
    _method: 'PATCH',
    product_name: productName,
    description: description,
    price: price,
    stock: stock,
    category_id: categoryId,
  };

  return api(
    'POST',
    '/product/' + productId,
    image ? createFormData(image, 'image', body) : JSON.stringify(body),
    token,
    image ? true : false,
  );
};

export const deleteProduct = (productId, token) => {
  return api('DELETE', '/product/' + productId, null, token);
};

export const searchProduct = (keyword) => {
  const body = {
    keyword: keyword,
  };
  return api('POST', '/search', JSON.stringify(body));
};
