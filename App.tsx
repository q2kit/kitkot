// In App.js in a new project

import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './src/redux/store';
import Main from './src/screens/Main';


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="#000"
          />
          <Main />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}

export default App;
