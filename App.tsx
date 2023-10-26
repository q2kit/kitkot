// In App.js in a new project

import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './src/redux/store';
import Main from './src/screens/Main';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import Notification from './src/components/Notification';

const queryClient = new QueryClient();


function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
              barStyle="light-content"
              backgroundColor="#000"
            />
            <Main />
            <Toast />
            <Notification />
          </SafeAreaView>
        </PersistGate>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
