import React from 'react';
import Router from './src/routes/Router';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {StatusBar} from 'react-native';
import {colors} from './src/styles/styles';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor={colors.backgroundDark} />
      <Router />
    </Provider>
  );
};

export default App;
