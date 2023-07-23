import userReducer, {UserReducerType} from 'store/reducers/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistReducer from 'redux-persist/es/persistReducer';
import {PersistConfig, persistCombineReducers} from 'redux-persist';

const persistConfig: PersistConfig<UserReducerType> = {
  key: 'persist-store',
  storage: AsyncStorage,
  blacklist: [],
};

const persistedReducer = persistCombineReducers(persistConfig, {
  user: persistReducer(
    {
      key: 'user',
      storage: AsyncStorage,
      blacklist: ['isLoading', 'message', 'isError'],
      whitelist: ['whitelistedReducer'],
    },
    userReducer,
  ),
});

export default persistedReducer;
