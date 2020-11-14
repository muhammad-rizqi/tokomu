import {api} from './global_var/api';

export const getCategoryList = () => {
  return api('GET', '/categories');
};
