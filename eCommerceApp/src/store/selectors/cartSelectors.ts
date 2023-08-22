import {RootState} from 'store';
import {CartReducerStateType} from 'store/reducers/cartSlice';

export const cartState = (state: RootState & {cart: CartReducerStateType}) =>
  state.cart.get;
export const addToCartState = (
  state: RootState & {cart: CartReducerStateType},
) => state.cart.addTo;
export const updateQuantityState = (
  state: RootState & {cart: CartReducerStateType},
) => state.cart.update;
export const removeFromCartState = (
  state: RootState & {cart: CartReducerStateType},
) => state.cart.remove;
