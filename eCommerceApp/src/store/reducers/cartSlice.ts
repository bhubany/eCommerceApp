import {AnyAction, Reducer, createSlice} from '@reduxjs/toolkit';
import {CART_ACTION, STATUS} from 'common/enums';
import {UNKNOWN_ERROR_OCCURED} from 'common/messages/error.message';
import {
  AddToCartResp,
  CartDetails,
  RemoveFromCart,
  UpdateProductQuantity,
} from 'common/types';
import {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  userCart,
} from 'store/actions/cartAction';

const initialStateCart: CartDetails = {
  id: '',
  userId: '',
  totalBill: 0,
  products: [],
  message: '',
  status: STATUS.PENDING,
};

const initialStateRemoveProduct: RemoveFromCart & {
  status: STATUS;
  message: string;
} = {
  userId: '',
  productId: '',
  message: '',
  status: STATUS.PENDING,
};

const initialStateUpdateQuantity: UpdateProductQuantity & {
  status: STATUS;
  message: string;
} = {
  action: CART_ACTION.ADD,
  quantity: 0,
  userId: '',
  productId: '',
  message: '',
  status: STATUS.PENDING,
};

const initialStateAddToCart: AddToCartResp = {
  status: STATUS.PENDING,
  message: '',
};

const cartSlice = createSlice({
  name: 'userReducer',
  initialState: {
    get: initialStateCart,
    addTo: initialStateAddToCart,
    remove: initialStateRemoveProduct,
    update: initialStateUpdateQuantity,
  },
  reducers: {
    cleanAddToCartStatus(state) {
      state.addTo = {
        ...state.addTo,
        status: STATUS.PENDING,
        message: '',
      };
    },
    cleanUpdateStatus(state) {
      state.update = {
        ...state.update,
        status: STATUS.PENDING,
        message: '',
      };
    },
    cleanRemoveStatus(state) {
      state.remove = {
        ...state.remove,
        status: STATUS.PENDING,
        message: '',
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(userCart.pending, (state, _) => {
        state.get = {
          ...initialStateCart,
          status: STATUS.LOADING,
        };
      })
      .addCase(userCart.fulfilled, (state, action) => {
        state.get = {
          ...state.get,
          ...action.payload,
          status: STATUS.SUCCESS,
          message: 'Cart fetched Sucessfully!',
        };
      })
      .addCase(userCart.rejected, (state, action) => {
        state.get = {
          ...initialStateCart,
          status: STATUS.FAILED,
          message: action.error.message || UNKNOWN_ERROR_OCCURED,
        };
      })
      .addCase(addToCart.pending, (state, _) => {
        state.addTo = {
          ...initialStateAddToCart,
          status: STATUS.LOADING,
        };
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.addTo = {
          ...state.addTo,
          status: STATUS.SUCCESS,
          message: action.payload as unknown as string,
        };
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.addTo = {
          ...initialStateAddToCart,
          status: STATUS.FAILED,
          message: action.error.message || UNKNOWN_ERROR_OCCURED,
        };
      })
      .addCase(updateCartQuantity.pending, (state, _) => {
        state.update = {
          ...initialStateUpdateQuantity,
          status: STATUS.LOADING,
        };
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.update = {
          ...state.update,
          status: STATUS.SUCCESS,
          message: action.payload as unknown as string,
        };
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.update = {
          ...initialStateUpdateQuantity,
          status: STATUS.FAILED,
          message: action.error.message || UNKNOWN_ERROR_OCCURED,
        };
      })
      .addCase(removeFromCart.pending, (state, _) => {
        state.remove = {
          ...initialStateRemoveProduct,
          status: STATUS.LOADING,
        };
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.remove = {
          ...state.remove,
          status: STATUS.SUCCESS,
          message: action.payload as unknown as string,
        };
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.remove = {
          ...initialStateRemoveProduct,
          status: STATUS.FAILED,
          message: action.error.message || UNKNOWN_ERROR_OCCURED,
        };
      });
  },
});

const cartReducer = cartSlice.reducer;
export default cartReducer;
export type CartReducerType = Reducer<CartDetails, AnyAction>;
export type CartReducerStateType = ReturnType<typeof cartReducer>;
export const {cleanAddToCartStatus, cleanRemoveStatus, cleanUpdateStatus} =
  cartSlice.actions;
