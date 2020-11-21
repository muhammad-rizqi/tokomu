import {api} from './global_var/api';

export const getTransactionList = (userId, token) => {
  return api('GET', `/user/${userId}/transaction`, null, token);
};

export const getTransaction = (transactionId, token) => {
  return api('GET', `/transaction/${transactionId}`, null, token);
};

export const addTransaction = (userId, productId, qty, token) => {
  const body = {
    user_id: userId,
    product_id: productId,
    qty: qty,
  };
  return api('POST', '/transaction', JSON.stringify(body), token);
};

export const updateTransaction = (transactionId, status, token) => {
  const body = {
    _method: 'PATCH',
    status: status,
  };

  return api(
    'POST',
    '/transaction/' + transactionId,
    JSON.stringify(body),
    token,
  );
};

export const approveTransaction = (
  transactionId,
  receipt,
  delieryService,
  token,
) => {
  const body = {
    transaction_id: transactionId,
    receipt: receipt,
    deliery_service: delieryService,
  };
  return api('POST', '/transaction/approve', JSON.stringify(body), token);
};
