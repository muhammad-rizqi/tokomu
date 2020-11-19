import {api} from './global_var/api';

export const getAccount = (shopId, token) => {
  return api('GET', '/shop/account/' + shopId, null, token);
};

export const addAccount = (
  shopId,
  accountName,
  accountNumber,
  bankName,
  bankCode,
  token,
) => {
  const body = {
    shop_id: shopId,
    nama_rekening: accountName,
    no_rekening: accountNumber,
    nama_bank: bankName,
    kode_bank: bankCode,
  };
  return api('POST', '/shop/account', JSON.stringify(body), token);
};

export const updateAccount = (
  shopId,
  accountName,
  accountNumber,
  bankName,
  bankCode,
  token,
) => {
  const body = {
    nama_rekening: accountName,
    no_rekening: accountNumber,
    nama_bank: bankName,
    kode_bank: bankCode,
  };
  return api('POST', '/shop/account/' + shopId, JSON.stringify(body), token);
};

export const deleteAccount = (shopId, token) => {
  return api('DELETE', '/shop/account/' + shopId, null, token);
};
