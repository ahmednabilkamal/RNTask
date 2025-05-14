import React from 'react';
import {LogBox, SafeAreaView, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persistor} from './src/store';
import HomeScreen from './src/screens/HomeScreen';

const App = () => {
  LogBox.ignoreAllLogs();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{flex: 1}}>
          <StatusBar barStyle="dark-content" />
          <HomeScreen />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default App;
