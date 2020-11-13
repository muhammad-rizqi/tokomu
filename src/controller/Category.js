import {api} from './global_var/api';

export const getCategoryList = async () => {
  return await api('GET', '/categories');
};
