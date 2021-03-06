import {combineReducers} from 'redux';

const tokenState = '';

const tokenReducer = (state = tokenState, action) => {
  switch (action.type) {
    case 'CHANGE':
      return action.data;
    case 'CLEAR':
      return null;
    default:
      return state;
  }
};

const userState = {
  id: 0,
  email: '',
  name: '',
  role: 0,
};

const userReducer = (state = userState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data;
    case 'CHANGE_ID':
      return {
        ...state,
        id: action.data.id,
      };
    case 'CLEAR':
      return null;
    default:
      return state;
  }
};

const shopState = {
  id: 0,
};

const shopReducer = (state = shopState, action) => {
  switch (action.type) {
    case 'SET_ID':
      return {id: action.data};
    default:
      return state;
  }
};
const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CART':
      return action.data;
    default:
      return state;
  }
};

const chatBadge = (state = 0, action) => {
  switch (action.type) {
    case 'SET_CHAT_BADGE':
      return action.data;
    default:
      return state;
  }
};

export default combineReducers({
  user: userReducer,
  token: tokenReducer,
  shop: shopReducer,
  cartReducer: cartReducer,
  chatBadge: chatBadge,
});
