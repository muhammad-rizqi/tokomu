const changeToken = (data) => {
  return {
    type: 'CHANGE',
    data: data,
  };
};

const clearToken = () => {
  return {
    type: 'CLEAR',
  };
};

const setUser = (id, email, name, role) => {
  return {
    type: 'SET_USER',
    data: {
      id: id,
      email: email,
      name: name,
      role: role,
    },
  };
};

export {changeToken, clearToken, setUser};
