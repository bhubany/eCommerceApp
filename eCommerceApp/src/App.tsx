import React from 'react';
import {View} from 'react-native';
import Navigation from './navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from 'store';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <View style={{flex: 1}}>
        <Navigation />
      </View>
    </PersistGate>
  </Provider>
);

export default App;
