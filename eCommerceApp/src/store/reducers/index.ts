import AsyncStorage from '@react-native-async-storage/async-storage';
import {PersistConfig, persistCombineReducers} from 'redux-persist';
import persistReducer from 'redux-persist/es/persistReducer';
import userReducer, {UserReducerType} from 'store/reducers/userSlice';
import cartReducer, {CartReducerType} from './cartSlice';

const persistConfig: PersistConfig<UserReducerType | CartReducerType> = {
  key: 'persist-store',
  storage: AsyncStorage,
  blacklist: [],
};

const persistedReducer = persistCombineReducers(persistConfig, {
  user: persistReducer(
    {
      key: 'user',
      storage: AsyncStorage,
      blacklist: ['message', 'status'],
      whitelist: ['whitelistedReducer'],
    },
    userReducer,
  ),
  cart: persistReducer(
    {
      key: 'cart',
      storage: AsyncStorage,
      blacklist: ['message', 'status'],
      whitelist: ['whitelistedReducer'],
    },
    cartReducer,
  ),
});

export default persistedReducer;
