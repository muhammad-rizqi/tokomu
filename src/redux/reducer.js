const tokenState = '';

const tokenReducer = (state = tokenState, action) => {
  switch (action.type) {
    case 'CHANGE':
      return action.data;
    case 'CLEAR':
      return null;
  }
};

export default tokenReducer;
