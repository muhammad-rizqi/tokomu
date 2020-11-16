import React from 'react';
import Router from './src/routes/Router';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {StatusBar} from 'react-native';
import {colors} from './src/styles/styles';
import {Provider as PaperProvider} from 'react-native-paper';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor={colors.backgroundDark} />
      <PaperProvider>
        <Router />
      </PaperProvider>
    </Provider>
  );
};

export default App;
