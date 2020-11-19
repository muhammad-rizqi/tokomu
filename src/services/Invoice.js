import {api} from './global_var/api';

export const invoice = (id, token) => {
  return api('GET', '/invoice/' + id, null, token);
};

export const invoiceByTransaction = (transactionId, token) => {
  return api('GET', '/invoice/transaction/' + transactionId, null, token);
};

export const updateInvoice = (invoiceId, receipt, deliveryService, token) => {
  const body = {
    receipt: receipt,
    delivery_service: deliveryService,
  };
  return api('POST', '/invoice/' + invoiceId, JSON.stringify(body), token);
};

export const deleteInvoice = (invoiceId, token) => {
  return api('DELETE', '/invoice/' + invoiceId, null, token);
};
