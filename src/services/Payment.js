import {api} from './global_var/api';
import {createFormData} from './helper';

export const paymentList = (userId, token) => {
  return api('GET', '/payment/' + userId, null, token);
};

export const payment = (transactionId, token) => {
  return api('GET', '/payment/transaction/' + transactionId, null, token);
};

export const sendPayment = (transactionId, image, token) => {
  const body = {
    transaction_id: transactionId,
  };

  return api(
    'POST',
    '/payment',
    createFormData(image, 'image', body),
    token,
    true,
  );
};
