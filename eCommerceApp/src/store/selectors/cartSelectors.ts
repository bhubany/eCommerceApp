import {RootState} from 'store';
import {CartReducerStateType} from 'store/reducers/cartSlice';

export const cartState = (state: RootState & {cart: CartReducerStateType}) =>
  state.cart.get;
export const addToCartState = (
  state: RootState & {cart: CartReducerStateType},
) => state.cart.addTo;
export const cartProductsState = (
  state: RootState & {cart: CartReducerStateType},
) => state.cart.get;
export const removeFromCartState = (
  state: RootState & {cart: CartReducerStateType},
) => state.cart.get;
