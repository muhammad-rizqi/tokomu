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

const setShopId = (data) => {
  return {
    type: 'SET_ID',
    data: data,
  };
};

const setCartData = (data) => {
  return {
    type: 'SET_CART',
    data: data,
  };
};

const setChatBadge = (data) => {
  return {
    type: 'SET_CHAT_BADGE',
    data: data,
  };
};
export {changeToken, clearToken, setUser, setShopId, setCartData, setChatBadge};
