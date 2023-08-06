import NetInfo from '@react-native-community/netinfo';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import NoInternet from 'screens/no-internet';
import {persistor, store} from 'store';
import Navigation from './navigation';

const App = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      // setIsConnected(state.type === 'wifi' ? true : false);
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={{flex: 1}}>
          {isConnected ? (
            <>
              <Navigation />
              <Toast />
            </>
          ) : (
            <NoInternet />
          )}
        </View>
      </PersistGate>
    </Provider>
  );
};

export default App;
