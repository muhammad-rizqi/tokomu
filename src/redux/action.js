export const changeToken = (data) => {
  return {
    type: 'CHANGE',
    data: data,
  };
};

export const clearToken = () => {
  return {
    type: 'CLEAR',
  };
};
